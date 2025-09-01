import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './modules/Auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseCategoryModule } from './modules/course-category/course-category.module';
import { CourseModule } from './modules/course/course.module';
import { PurchasedCourseModule } from './modules/purchased-course/purchased-course.module';
import { RatingModule } from './modules/rating/rating.module';
import { LessonBolimModule } from './modules/lesson-bolim/lesson-bolim.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { LessonFileModule } from './modules/lesson-file/lesson-file.module';
import { HomeworkModule } from './modules/homework/homework.module';
import { ExamModule } from './modules/exam/exam.module';
import { QuestionAnswerModule } from './modules/question-answer/question-answer.module';
import { SeaderModule } from './core/seader/seader.module';
import { RedisModule } from './core/redis/redis.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { VerificationModule } from './modules/verification/verification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PaymentsModule } from './modules/payments/payments.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [

    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot(
    {
      rootPath: join(process.cwd(), 'uploads/banner'), 
      serveRoot: '/banner/url', 
    },
    {
      rootPath: join(process.cwd(), 'uploads/Introvideo'), 
      serveRoot: '/introvideo/url', 
    },
    {
      rootPath: join(process.cwd(), 'uploads/profile'), 
      serveRoot: '/profile/url', 
    }
  ), 


    PrismaModule ,AuthModule,VerificationModule,UserModule,
    ProfilesModule,CourseModule,CourseCategoryModule,PurchasedCourseModule,LessonModule, 
    LessonBolimModule, LessonFileModule,
    RatingModule,ExamModule,HomeworkModule,
    QuestionAnswerModule,PaymentsModule ,SeaderModule,RedisModule, 

    
  ],
})
export class AppModule { }
