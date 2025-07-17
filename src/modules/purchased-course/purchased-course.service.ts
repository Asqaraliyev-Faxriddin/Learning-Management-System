import { Injectable } from '@nestjs/common';
import { CreatePurchasedCourseDto } from './dto/create-purchased-course.dto';
import { UpdatePurchasedCourseDto } from './dto/update-purchased-course.dto';

@Injectable()
export class PurchasedCourseService {
  create(createPurchasedCourseDto: CreatePurchasedCourseDto) {
    return 'This action adds a new purchasedCourse';
  }

  findAll() {
    return `This action returns all purchasedCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchasedCourse`;
  }

  update(id: number, updatePurchasedCourseDto: UpdatePurchasedCourseDto) {
    return `This action updates a #${id} purchasedCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchasedCourse`;
  }
}
