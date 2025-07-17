import { Injectable } from '@nestjs/common';
import { CreateLessonBolimDto } from './dto/create-lesson-bolim.dto';
import { UpdateLessonBolimDto } from './dto/update-lesson-bolim.dto';

@Injectable()
export class LessonBolimService {
  create(createLessonBolimDto: CreateLessonBolimDto) {
    return 'This action adds a new lessonBolim';
  }

  findAll() {
    return `This action returns all lessonBolim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonBolim`;
  }

  update(id: number, updateLessonBolimDto: UpdateLessonBolimDto) {
    return `This action updates a #${id} lessonBolim`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonBolim`;
  }
}
