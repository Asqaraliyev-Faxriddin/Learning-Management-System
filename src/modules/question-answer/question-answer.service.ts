import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { createAnswerQuestions, QuestionsCreate, QuestionsMine, updateAnswer, UpdateQuestonsStudent } from './dto/create-question-answer.dto';
import * as path from 'path';
import * as fs from "fs"


@Injectable()
export class QuestionAnswerService {
  constructor(private prisma:PrismaService){}

  async QuestionsAllMine(userId:string,payload:QuestionsMine){
    let {course_id,answered,read,limit=10,offset=1} = payload

    let filter:any = []

    if(course_id){
      filter.push({
        courseId:course_id
      })
    }

    if(answered){
      filter.push({
        answered
      })
    }

    if(read){
      filter.push({
        read
      })
    }


    let wherefilter:any = {userId}

    if(filter.length){
      wherefilter.OR = filter
    }

    let data = await this.prisma.question.findMany({
      where:wherefilter,
      include:{
        course:true,
        user:true
      }
    })

    if(!data) throw new NotFoundException("Questions not found")

      return data
  }


  async QuestionsAllMineCourse(userId: string, payload: QuestionsMine) {
    let { course_id, answered, read, limit = 10, offset = 1 } = payload;
  
    if (read === "true") read = true;
    else if (read === "false") read = false;
  
    if (answered === "true") answered = true;
    else if (answered === "false") answered = false;
  
    const wherefilter: any = {
      AND: [
        ...(course_id ? [{ courseId: course_id }] : []),
        ...(read !== undefined ? [{ read }] : []),
        ...(answered !== undefined 
          ? answered 
            ? [{ answer: { isNot: null } }]
            : [{ answer: null }]
          : []
        ),
      ]
    };
  
    const data = await this.prisma.question.findMany({
      where: wherefilter,
      include: { course: true, user: true },
      skip: (offset - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  
    if (!data || data.length === 0)
      throw new NotFoundException("Questions not found");
  
    return data;
  }
  
  


  async QuestionsOneCourse(userId:string,courseId:string){
   
    

    let data = await this.prisma.question.findMany({
      where:{
        courseId
      },
      include:{
        course:true,
        user:true
      }
    })

    if(!data) throw new NotFoundException("Questions not found")

      return data
  }



  async QuestionsViewOne(question_id:string){
   
      
    let olfu = await this.prisma.question.findFirst({
      where:{
        id:question_id
      }
    })

    if(!olfu) throw new NotFoundException()


    let data = await this.prisma.question.update({
      where:{
        id:question_id
      },
      data:{
        read:true
      },
      include:{
        course:true,
        user:true
      }
    })

    if(!data) throw new NotFoundException("Questions not found")


      return data
  }


  async QuestoinsCreate(userId: string, payload: QuestionsCreate, filename?: string) {
    const { courseId, task } = payload;
  
    const oldcourse = await this.prisma.course.findFirst({
      where: { id: courseId },
    });
  
    if (!oldcourse) throw new NotFoundException("Course not found");
  
    const dataObj: any = {
      text: task,
      userId,
      courseId,
      read: false,
      readAt: new Date(),
    };
  
    if (filename != undefined) {
      dataObj.file = filename;
    }
  
    const data = await this.prisma.question.create({
      data: dataObj,
      include: {
        course: true,
        user: true,
      },
    });
  
    if (!data) return { status: false, message: "No created" };
  
    return data;
  }
  


  async updateQuestion(userId: string, payload: UpdateQuestonsStudent, filename?: string) {
    const { questionId, text } = payload;
  
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
  
    if (!question) throw new NotFoundException("Question not found");
    if (question.userId !== userId) throw new ConflictException("Questions updated no");
  
    if (filename && question.file) {
      const oldFilePath = path.join(process.cwd(), "uploads", "questions", question.file);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); 
      }
    }
  
    const updated = await this.prisma.question.update({
      where: { id: questionId },
      data: {
        text: text || question.text,
        file: filename || question.file,
      },
      include: {
        user: true,
        course: true,
      },
    });
  
    return { data: updated };
  }


async createAnswer(userId: string, payload: createAnswerQuestions, filename?: string) {
  const { questionId, text } = payload;

  const question = await this.prisma.question.findUnique({ where: { id: questionId } });
  if (!question) throw new NotFoundException("Question not found");

  const existingAnswer = await this.prisma.questionAnswer.findUnique({
    where: { questionId },
  });
  if (existingAnswer) {
    throw new ConflictException("Answer already exists. Use update instead.");
  }

  // data objectni dinamik yig'amiz
  const data: any = {
    userId,
    questionId,
    text,
  };

  if (filename != undefined) {
    data.file = filename;
  }

  const answer = await this.prisma.questionAnswer.create({ data });

  await this.prisma.question.update({
    where: { id: questionId },
    data: { read: true, updatedAt: new Date() },
  });

  return { data: answer };
}

  

    async updateAnswer(
      userId: string,
      answerId: string,
      payload: updateAnswer,
      filename?: string
    ) {
      const { text } = payload;
    
      const answer = await this.prisma.questionAnswer.findUnique({
        where: { id: answerId },
      });
      if (!answer) throw new NotFoundException("Answer not found");
    
      if (filename && answer.file) {
        const oldPath = path.join(process.cwd(), "uploads", "answers", answer.file);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    
      const updated = await this.prisma.questionAnswer.update({
        where: { id: answerId },
        data: {
          text: text ?? answer.text,         
          file: filename ?? answer.file,    
        },
      });
    
      return updated;
    }


  async deleteAnswer(userId:string,answerId: string) {
    const question = await this.prisma.question.findUnique({
      where: { id:answerId },
    });
  
    if (!question) throw new NotFoundException("Answer not found");
  
    if (question.userId !== userId) {
      throw new ConflictException("No deleted questions");
    }
  
    if (question.file) {
      const filePath = path.join(process.cwd(), "uploads", "answers", question.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  
    await this.prisma.question.delete({ where: { id:answerId } });
  
    return { status: true, message: "Answer deleted" };
  }
  

  async deleteQuestion(userId: string, questionId: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
  
    if (!question) throw new NotFoundException("Question not found");
  
    if (question.userId !== userId) {
      throw new ConflictException("No deleted questions");
    }
  
    if (question.file) {
      const filePath = path.join(process.cwd(), "uploads", "questions", question.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  
    await this.prisma.question.delete({ where: { id: questionId } });
  
    return { status: true, message: "Question deleted" };
  }


}
