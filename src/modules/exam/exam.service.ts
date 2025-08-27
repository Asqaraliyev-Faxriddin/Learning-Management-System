import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateExamDto, createManyQuestions } from './dto/create-exam.dto';
import { ExamAnswer } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async getByLessonGroupId(userId: string, lessonbolimId: string) {
    
    let exams = await this.prisma.exam.findMany({
      where: { lessonBolimId: lessonbolimId },
    });
  
    if (!exams) {
      throw new NotFoundException('Exam not found');
    }
  
    let bolim = await this.prisma.lessonBolim.findFirst({
      where: { id: lessonbolimId },
      select: { courseId: true },
    });
  
    if (!bolim) {
      throw new NotFoundException("LessonBolim Not found");
    }
  
    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId: userId,
        courseId: bolim.courseId,
      },
    });
  
    if (!isPurchased) {
      throw new ConflictException("Payment Cash");
    }
  
    return exams;
  }
  
  async getLessonGroupDetails(id: string) {
    let exams = await this.prisma.exam.findMany({
      where: {lessonBolimId: id },
      include: { Bolim: true },
    });

    if (!exams.length) throw new NotFoundException('No exams found for this lesson group');
    return exams;
  }

  async getExamDetail(id: string) {
    let exam = await this.prisma.exam.findUnique({
      where: { id },
      include: { Bolim: true },
    });

    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async createExam(payload: createManyQuestions) {
    
    let {question,variantA,variantB,variantC,variantD,answer,lessonbolimId} = payload
    
    let bolim = await this.prisma.lessonBolim.findUnique({
      where: { id:lessonbolimId },
    });
    if (!bolim) throw new NotFoundException('Lesson bolim not found');

    return this.prisma.exam.create({
      data: {
        lessonBolimId:lessonbolimId,
        answer,
        question,
        variantA,
        variantB,
        variantC,
        variantD
      },
    });
  }

  async createMany(payload: createManyQuestions) {
    let {question,variantA,variantB,variantC,variantD,answer,lessonbolimId} = payload


    return this.prisma.exam.createMany({
      data: {
        lessonBolimId:lessonbolimId,
        answer,
        question,
        variantA,
        variantB,
        variantC,
        variantD
      },
    });
  }

  async updateExam(id: string, payload: Partial<createManyQuestions>) {
    let found = await this.prisma.exam.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Exam not found');

    return this.prisma.exam.update({
      where: { id },
      data: payload,
    });
  }

  async deleteExam(id: string) {
    let found = await this.prisma.exam.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('Exam not found');

    return this.prisma.exam.delete({ where: { id } });
  }

  async ExamPass(userId: string, payload: CreateExamDto) {
    let { lessonbolimId, id, answer } = payload;
  
    let bolim = await this.prisma.lessonBolim.findUnique({
      where: { id: lessonbolimId },
      select: { courseId: true, id: true },
    });
    if (!bolim) throw new NotFoundException('Lesson bolim not found');
  
    let isPurchased = await this.prisma.purchasedCourse.findFirst({
      where: {
        userId,
        courseId: bolim.courseId,
      },
    });
    if (!isPurchased) throw new ConflictException('Payment required');
  
    let exam = await this.prisma.exam.findUnique({
      where: { id },
    });
    if (!exam) throw new NotFoundException('Question not found');
  
    let isCorrect = exam.answer === answer;
  
    await this.prisma.examResult.create({
      data: {
        lessonBolimId: bolim.id,
        userId,
        corrects: isCorrect ? 1 : 0,
        wrongs: isCorrect ? 0 : 1,
        passed: isCorrect,
      },
    });
  
    return {
      correct: isCorrect,
      correctAnswer: exam.answer,
      yourAnswer: answer,
    };
  }
  

  async getAllResults() {
    return this.prisma.examResult.findMany();
  }

  async getResultsByLessonGroup(id: string) {
    let data = await this.prisma.examResult.findMany({
      where: { lessonBolimId: id },
    });

    if (!data.length) throw new NotFoundException('Results not found');
    return data;
  }
}
