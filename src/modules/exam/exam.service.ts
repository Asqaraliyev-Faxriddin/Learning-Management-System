import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamService {
  constructor(private prisma:PrismaService){}

  async ExamOnelesson(id:string){
    let data = await this.prisma.exam.findFirst({
      where:{
        lessonBolimId:id
      },
      include:{
        Bolim:true,
      }
    })
  
    if(!data) throw new NotFoundException("Exam not found")

      return data
  }

  async ExamPass(payload:CreateExamDto){

    let {lessonbolimId,id,answer} = payload

    let oldbolim = await this.prisma.lessonBolim.findFirst({
      where:{
        id:lessonbolimId
      }
    })

    if(!oldbolim) throw new NotFoundException("Lesson bolim not found")

    let oldquestions = await this.prisma.exam.findFirst({
      where:{
        id
      }
    })

    if(!oldquestions) throw new NotFoundException("Questions Not found")

      let data = await this.prisma.exam.findMany({
        where:{
          lessonBolimId:lessonbolimId
        }
      })


     

      
      }
    
  
}
