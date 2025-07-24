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
        course_id
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


  async QuestionsAllMineCourse(userId:string,payload:QuestionsMine){
    let {course_id,answered,read,limit=10,offset=1} = payload

    let filter:any = []

    if(course_id){
      filter.push({
        course_id
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


    let wherefilter:any = {}

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



  async QuestionsViewOne(userId:string,question_id:string){
   
    

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


  async QuestoinsCreate(userId:string,payload:QuestionsCreate,filename:string){
    let {courseId,task} = payload

    let oldcourse = await this.prisma.course.findFirst({
      where:{
        id:courseId
      }
    })

    if(!oldcourse) throw new NotFoundException("Course not found")

    let data = await this.prisma.question.create({
      data:{
        text:task,
        file:filename,
        userId,
        courseId,
        read:false,
        readAt:new Date()
      },
      include:{
        course:true,
        user:true
      }
    })

    if(!data) return {status:false,message:"No created"}

    return data
  }


  async updateQuestion(userId: string, payload:UpdateQuestonsStudent, filename?: string) {
   
   let {questionId,text} = payload
    
    let question = await this.prisma.question.findUnique({ where: { id: questionId } });
    if (!question) throw new NotFoundException("Question not found");
    if (question.userId !== userId) throw new ConflictException("Questions updated no");
  
    let updated = await this.prisma.question.update({
      where: { id: questionId },
      data: {
        text:text || question.text,
        file:filename || question.file
      },
      include: {
        user: true,
        course: true,
      },
    });
  
    return {data:updated};
  }


  async createAnswer(userId: string,payload:createAnswerQuestions, filename?: string) {

    let {questionId,text} = payload
    let question = await this.prisma.question.findUnique({ where: { id: questionId } });
    if (!question) throw new NotFoundException("Question not found");
  
    let existingAnswer = await this.prisma.questionAnswer.findUnique({
      where: { questionId },
    });
    if (existingAnswer) throw new ConflictException("Answer already exists. Use update instead.");
  
    let answer = await this.prisma.questionAnswer.create({
      data: {
        userId,
        questionId,
        text,
        file: filename || null,
      },
    });
  
    await this.prisma.question.update({
      where: { id: questionId },
      data: { read: true, updatedAt: new Date() },
    });
  
    return {data:answer};
  }
  
  

  async updateAnswer(userId: string, answerId: string, payload:updateAnswer, filename?: string) {
    
    let {text} = payload
    
    let answer = await this.prisma.questionAnswer.findUnique({ where: { id: answerId } });
    if (!answer) throw new NotFoundException("Answer not found");
  
    if (filename) {

  
      let oldPath = path.join(process.cwd(),"uploads","banner",answer.file!);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      
    }
  
    let updated = await this.prisma.questionAnswer.update({
      where: { id: answerId },
      data: {
        text:text || answer.text,
        file:filename || answer.file
      },
    });
  
    return updated;
  }
  

  async deleteAnswer(answerId: string) {
    let answer = await this.prisma.questionAnswer.findUnique({ where: { id: answerId } });
    if (!answer) throw new NotFoundException("Answer not found");
  
    await this.prisma.questionAnswer.delete({ where: { id: answerId } });
  
  
    return { status: true, message: "Answer deleted" };
  }
  

  async deleteQuestion(userId: string, questionId: string) {
    let question = await this.prisma.question.findUnique({ where: { id: questionId } });
    
    if (!question) throw new NotFoundException("Question not found");
    
    if (question.userId !== userId) throw new ConflictException("No deleted questions");
  

    await this.prisma.question.delete({ where: { id: questionId } });
  
    return { status: true, message: "Question deleted" };
  }
  


}
