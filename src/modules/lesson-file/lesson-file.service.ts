import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateLessonFileDto } from './dto/create-lesson-file.dto';

@Injectable()
export class LessonFileService {
  constructor(private prisma:PrismaService){}
  async lessonfilesone(lesson_id:string){
    let data = await this.prisma.lessonFile.findFirst({
      where:{
        id:lesson_id
      },
      include:{
      lesson:true
      }
    })

    if(!data) throw new NotFoundException("Lesson file not found")

      return data
  }


  async CreateLessonFile(payload:CreateLessonFileDto,filename:string){
    let {lessonId,notes} = payload

    let oldLesson = await this.prisma.lesson.findFirst({
      where:{
        id:lessonId
      }
    })

    if(!oldLesson) throw new NotFoundException("Lesson Not found")

    let data = await this.prisma.lessonFile.create({
      data:{
        lessonId,
        note:notes,
        file:filename
      },
      include:{
        lesson:true
      }
    })

    return data
  }


  async Lesson(id:string){
    let oldLessonfile = await this.prisma.lessonFile.findFirst({
      where:{
        id
      }
    })

    if(!oldLessonfile) throw new NotFoundException("Lesson file nt found")
  
      return {data:oldLessonfile}
    }


    async LessonAll(){
      let oldLessonfile = await this.prisma.lessonFile.findMany({

          
        
      })
  
    
        return {data:oldLessonfile}
      }
  



}
