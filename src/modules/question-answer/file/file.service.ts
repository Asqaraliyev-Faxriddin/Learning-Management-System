import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as fs from "fs"
import * as path from "path"

@Injectable()
export class FileService {
    constructor(private prisma:PrismaService){}


    async FileBanner(name:string){
                
        let url = `http://localhost:${process.env.PORT || 3000}/banner/url/${name}`
        let found = fs.existsSync(url);
        if (!found) {
          throw new NotFoundException("Fayl topilmadi");
        }

        return url
   
   
    }

    
    async FileIntrovideo(name:string){
        
        let url = `http://localhost:${process.env.PORT || 3000}/introvideo/url/${name}`
        let found = fs.existsSync(url);
        if (!found) {
          throw new NotFoundException("Fayl topilmadi");
        }

        return url
    }

    
    async FileProfile(name:string){

        let url = `http://localhost:${process.env.PORT || 3000}/profile/url/${name}`
        let found = fs.existsSync(url);
        if (!found) {
          throw new NotFoundException("Fayl topilmadi");
        }

        return url
    }

    async FileHomework(userId: string, lessonId: string, name: string) {
        let lesson = await this.prisma.lesson.findFirst({
          where: {
            id: lessonId,
            course: {
              purchasedCourses: {
                some: {
                  userId: userId,
                },
              },
            },
          },
        });
      
        if (!lesson) {
          throw new ForbiddenException("you aren't registered in this course");
        }
      
        let url =path.join(process.cwd(),"uploads","homework",name)
        let exists = fs.existsSync(url);
        if (!exists) {
          throw new NotFoundException("File Not found");
        }
      
        return fs.readFileSync(url)
      }
      
      

      async FileHomeworkSubmission(userId: string, lessonId: string, name: string) {
        let lesson = await this.prisma.lesson.findFirst({
          where: {
            id: lessonId,
            course: {
              purchasedCourses: {
                some: {
                  userId: userId,
                },
              },
            },
          },
        });
      
        if (!lesson) {
          throw new ForbiddenException("you aren't registered in this course");
        }
      
        let url = `http://localhost:${process.env.PORT || 3000}/homework/submission/url${name}`;
        let exists = fs.existsSync(url);
        if (!exists) {
          throw new NotFoundException("Fayl topilmadi");
        }
      
        return url
      }



      async FileHomeworkcheck(userId: string, lessonId: string, name: string) {
        let lesson = await this.prisma.lesson.findFirst({
          where: {
            id: lessonId,
            course: {
              purchasedCourses: {
                some: {
                  userId: userId,
                },
              },
            },
          },
        });
      
        if (!lesson) {
          throw new ForbiddenException("you aren't registered in this course");
        }
      
        let url = `http://localhost:${process.env.PORT || 3000}/homework/check/url${name}`;
        let exists = fs.existsSync(url);
        if (!exists) {
          throw new NotFoundException("Fayl topilmadi");
        }
      
        return url
      }




      async getLessonVideo(lessonId: string, hlsf: string): Promise<string> {
        let lesson = await this.prisma.lesson.findFirst({
          where: {
            id: lessonId,
          },
        });
      
        if (!lesson) throw new NotFoundException('Lesson not found');
      
        let fileName = `${hlsf}`;
        let fullPath = path.join(process.cwd(),'uploads', 'lesson', fileName);
      
        if (!fs.existsSync(fullPath)) {
          throw new NotFoundException('Video not found');
        }
      
        return fileName;
      }
      
}
