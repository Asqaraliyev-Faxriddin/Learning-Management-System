import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateLessonDto, UpdateLessonDto } from "./dto/create-lesson.dto";

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateLessonDto, video?: Express.Multer.File) {
    const videoUrl = video ? `http://localhost:3000/video/url/uploads/${video.filename}` : "";
  
    let data = await this.prisma.lesson.create({
      data: {
        name: dto.name,
        about: dto.about,
        video: videoUrl,
        courseId: dto.courseId,
        bolimId: dto.bolimId,
      },
    });

    return data || "Malumot yoq"
  }
  

  async update(id: string, dto: UpdateLessonDto, video?: Express.Multer.File) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException("Lesson not found");

    const videoUrl = video ? `http://localhost:3000/video/url/uploads/${video.filename}` : "";

    return this.prisma.lesson.update({
      where: { id },
      data: {
        name: dto.name,
        about: dto.about,
        video: videoUrl,
        courseId: dto.courseId,
        bolimId: dto.bolimId,
      },
    });
  }

  async delete(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException("Lesson not found");

    return this.prisma.lesson.delete({ where: { id } });
  }

  async getSingle(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException("Lesson not found");
    return lesson;
  }

  async getDetail(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        Bolim: {
          include: {
            course: true,
          },
        },
      },
    });
    if (!lesson) throw new NotFoundException("Lesson not found");
    return lesson;
  }

  async setView(userId: string, lessonId: string, view: boolean) {
    const existing = await this.prisma.lessonView.findFirst({
      where: { lessonId, userId },
    });

    if (existing) {
      return this.prisma.lessonView.update({
        where: { id: existing.id },
        data: { view },
      });
    }

    return this.prisma.lessonView.create({
      data: { lessonId, userId, view },
    });
  }

  async setLastActivity(userId: string, lessonId: string, url: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        Bolim: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) throw new NotFoundException("Lesson not found");

    return this.prisma.lastActivity.upsert({
      where: { userId },
      update: {
        lessonId,
        url,
        courseId: lesson.courseId,
        groupId: lesson.bolimId,
        updatedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        url,
        courseId: lesson.courseId,
        groupId: lesson.bolimId,
      },
    });
  }
}
