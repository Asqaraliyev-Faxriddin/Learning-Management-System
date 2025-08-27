import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as fs from "fs"
import * as path from "path"

@Injectable()
export class FileService {
    constructor(private prisma:PrismaService){}


    async FileBanner(name:string){
                
        let url = `http://localhost:${process.env.PORT || 3000}/banner/url/${name}`
        let filePath = path.join(process.cwd(),"uploads","banner",name)
        let found = fs.existsSync(filePath);
        if (!found) {
          throw new NotFoundException("File not found");
        }

        return url
   
   
    }

    
    async FileIntrovideo(name:string){
        
        let url = `http://localhost:${process.env.PORT || 3000}/introvideo/url/${name}`
        let filePath = path.join(process.cwd(),"uploads","Introvideo",name)
        let found = fs.existsSync(filePath);
        if (!found) {
          throw new NotFoundException("File not found");
        }

        return url
    }

    
    async FileProfile(name:string){

        let url = `http://localhost:${process.env.PORT || 3000}/profile/url/${name}`
        let filePath = path.join(process.cwd(),"uploads","profile",name)
        let found = fs.existsSync(filePath);
        if (!found) {
          throw new NotFoundException("File not found");
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
          throw new NotFoundException("File not found");
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
      
        let url = path.join(process.cwd(),"uploads","homework-submission",name)
        let exists = fs.existsSync(url);
        if (!exists) {
          throw new NotFoundException("File not found");
        }
      
        return fs.readFileSync(url)
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
      
        let url = path.join(process.cwd(),"uploads","homework-check",name)
        let exists = fs.existsSync(url);
        if (!exists) {
          throw new NotFoundException("File not found");
        }
      
        return fs.readFileSync(url)
      }




      async getLessonVideo(userId:string,lessonId: string, hlsf: string) {
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
        let url = path.join(process.cwd(),'uploads', 'lesson', hlsf);
      
        if (!fs.existsSync(url)) {
          throw new NotFoundException('Video not found');
        }
        
        return fs.readFileSync(url)
      }
      
}
