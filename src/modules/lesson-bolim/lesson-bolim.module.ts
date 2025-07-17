import { Module } from '@nestjs/common';
import { LessonBolimService } from './lesson-bolim.service';
import { LessonBolimController } from './lesson-bolim.controller';

@Module({
  controllers: [LessonBolimController],
  providers: [LessonBolimService],
})
export class LessonBolimModule {}
