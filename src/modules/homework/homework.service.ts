import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateHomeworkDto, HomeworksAllSubmissons, HomeworkSubmisionCheck, HomeworkSubmissionAll, SubmitHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import * as fs from "fs";
import * as path from "path";
import { HomeworkSubStatus } from "@prisma/client";

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHomeworkDto, fileName: string) {
    let lesson = await this.prisma.lesson.findUnique({
      where: { id: dto.lessonId }
    });

    if (!lesson) throw new NotFoundException("Lesson not found");

    return this.prisma.homework.create({
      data: {
        task: dto.task,
        file: fileName ?? null,
        lessonId: dto.lessonId
      }
    });
  }

  async update(id: string, dto: UpdateHomeworkDto, fileName?: string) {
    let homework = await this.prisma.homework.findUnique({ where: { id } });
    if (!homework) throw new NotFoundException("Homework not found");

    if (fileName && homework.file) {
      let filePath = path.join(process.cwd(),"uploads","homework", homework.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return this.prisma.homework.update({
      where: { id },
      data: {
        task: dto.task ?? homework.task,
        file: fileName ?? homework.file,
   
      }
    });
  }

  async delete(id: string) {
    let homework = await this.prisma.homework.findUnique({ where: { id } });
    if (!homework) throw new NotFoundException("Homework not found");

    if (homework.file) {
      let filePath = path.join(process.cwd(), "uploads","homework", homework.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.prisma.homework.delete({ where: { id } });
    return { message: "Deleted" };
  }

  async detail(id: string) {
    let data = await this.prisma.homework.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            name: true,
            course: true
          }
        }
      }
    });

    if (!data) throw new NotFoundException("Homework not found");
    return data;
  }

  async getByCourse(courseId: string) {
    let course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException("Course not found");

    let lessons = await this.prisma.lesson.findMany({
      where: { courseId },
      include: { course: true,views:true,Bolim:true, },
    });

    let lessonIds = lessons.map(l => l.id);

    let homework = await this.prisma.homework.findMany({
      where: { lessonId: { in: lessonIds } },
      include: {
        lesson: {
          select: {
            id: true,
            name: true,
            course: {
              select: { id: true, name: true }
            }
          }
        }
      }
    });

    if (!homework) throw new NotFoundException("Homework not found");

    return homework;
  }


  async homeworksublessonid(userId:string,payload:HomeworkSubmissionAll){

    let {lessonId,limit=10,offset =1} = payload

    let lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { courseId: true },
    });

    if(!lesson) throw new NotFoundException("Lesson not found")

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId,
        courseId: lesson.courseId, 
      }
    });
    if (!isPurchased) {
      throw new ConflictException("Payment Cash");
    }

    let data = await this.prisma.homeworkSubmission.findFirst({
      where:{
        homework:{
          lessonId:lessonId
        }
      },
      include:{
        homework:true,
      },
      take:limit,
      skip:(offset-1)*limit
    })



    if(!data) throw new NotFoundException("Lesson not found")

      return data
  }

  async submitHomework(userId: string,lessonId: string,dto: SubmitHomeworkDto,filename: string,) {
    let homework = await this.prisma.homework.findUnique({
      where: { lessonId },
    });

    if (!homework) {
      throw new NotFoundException('Homework not found');
    }

    let lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { courseId: true },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId,
        courseId: lesson.courseId,
      },
    });

    if (!isPurchased) {
      throw new ConflictException('Purchased Cash');
    }

    let alreadySubmitted = await this.prisma.homeworkSubmission.findFirst({
      where: {
        userId,
        homeworkId: homework.id,
      },
    });

    if (alreadySubmitted) {
      throw new ConflictException('Homework already reply');
    }

    let submission = await this.prisma.homeworkSubmission.create({
      data: {
        text: dto.text || null,
        file: filename,
        homeworkId: homework.id,
        userId: userId,
      },
    });

    return {
      message: 'Homework submissions successfully',
      submissionId: submission.id,
      status: submission.status,
    };
  }


  async HomeworksubmissionAll(payload:HomeworksAllSubmissons){

    let {offset=1,limit=10,status,course_id,homework_id,user_id} = payload
  
    let filter:any = []

    if(status){
      filter.push({
        status:status
      })
    }

    if(course_id){
      filter.push({
        course_id:course_id
      })
    }
    

    if(homework_id){
      filter.push({
        homework_id:homework_id
      })
    }


    if(user_id){
      filter.push({
        user_id:user_id
      })
    }
  
    let wherefilter:any = {}
    if(filter.length){
      wherefilter.OR =filter
    }

    let data = await this.prisma.homeworkSubmission.findMany({
      where:wherefilter,
      include:{
        homework:true,
        user:true
      },
      take:limit,
      skip:(offset-1)*limit
    })

    return data
  }


 async HomeworkSubmissionOne(userId:string,id:string){

  let data = await this.prisma.homeworkSubmission.findFirst({
    where:{
      
      id      
    }
  })

  if(!data) throw new NotFoundException("Homework Submission not found")
 
    return data
 
  
  }

  async HomeworksubmisionsCheck(userId: string,payload: HomeworkSubmisionCheck,filename: string) {
    let { approved, reason, submission_id } = payload;
  
    let oldSubmission = await this.prisma.homeworkSubmission.findFirst({
      where: {
        id: submission_id,
      },
    });
  
    if (!oldSubmission) {
      throw new NotFoundException("Homework Submission not found");
    }
  
    let updatedSubmission = await this.prisma.homeworkSubmission.update({
      where: {
        id: submission_id,
      },
      data: {
        status: approved ? HomeworkSubStatus.APPROVED : HomeworkSubStatus.REJECTED,
        reason,
        userId,
        file: filename,
      },
    });
  
    return updatedSubmission;
  }
  


  async submitHomeworkUser(userId:string,lessonId: string,dto: SubmitHomeworkDto,file: Express.Multer.File, ) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const homework = await this.prisma.homework.findUnique({
      where: { lessonId },
    });
    if (!homework) throw new NotFoundException('Homework not found for this lesson');

    const created = await this.prisma.homeworkSubmission.create({
      data: {
        text: dto.text,
        file: file.path,
        homeworkId: homework.id,
        userId,
        status:HomeworkSubStatus.PENDING,
      },
    });

    return { message: 'Homework submitted successfully', submission: created };
  }
}

