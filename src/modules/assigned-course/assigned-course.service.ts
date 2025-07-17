import { Injectable } from '@nestjs/common';
import { CreateAssignedCourseDto } from './dto/create-assigned-course.dto';
import { UpdateAssignedCourseDto } from './dto/update-assigned-course.dto';

@Injectable()
export class AssignedCourseService {
  create(createAssignedCourseDto: CreateAssignedCourseDto) {
    return 'This action adds a new assignedCourse';
  }

  findAll() {
    return `This action returns all assignedCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignedCourse`;
  }

  update(id: number, updateAssignedCourseDto: UpdateAssignedCourseDto) {
    return `This action updates a #${id} assignedCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignedCourse`;
  }
}
