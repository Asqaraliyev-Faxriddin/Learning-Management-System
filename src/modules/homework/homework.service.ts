import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHomeworkDto, fileName: string) {
    let lesson = await this.prisma.lesson.findUnique({
      where: { id: dto.lessonId }
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

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
    if (!homework) throw new NotFoundException('Homework not found');

    if (fileName && homework.file) {
      let filePath = path.join(__dirname, '..', '..', 'uploads', homework.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return this.prisma.homework.update({
      where: { id },
      data: {
        task: dto.task ?? homework.task,
        file: fileName ?? homework.file,
        updatedAt: new Date()
      }
    });
  }

  async delete(id: string) {
    let homework = await this.prisma.homework.findUnique({ where: { id } });
    if (!homework) throw new NotFoundException('Homework not found');

    if (homework.file) {
      let filePath = path.join(__dirname, '..', '..', 'uploads', homework.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.prisma.homework.delete({ where: { id } });
    return { message: 'Deleted' };
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

    if (!data) throw new NotFoundException('Homework not found');
    return data;
  }

  async getByCourse(courseId: string) {
    let course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    let lessons = await this.prisma.lesson.findMany({
      where: { courseId },
      select: { id: true }
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

    if (!homework.length) throw new NotFoundException('Homework not found');

    return homework;
  }
}
