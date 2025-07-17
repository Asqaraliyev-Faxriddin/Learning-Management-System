import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignedCourseService } from './assigned-course.service';
import { CreateAssignedCourseDto } from './dto/create-assigned-course.dto';
import { UpdateAssignedCourseDto } from './dto/update-assigned-course.dto';

@Controller('assigned-course')
export class AssignedCourseController {
  constructor(private readonly assignedCourseService: AssignedCourseService) {}

  @Post()
  create(@Body() createAssignedCourseDto: CreateAssignedCourseDto) {
    return this.assignedCourseService.create(createAssignedCourseDto);
  }

  @Get()
  findAll() {
    return this.assignedCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignedCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignedCourseDto: UpdateAssignedCourseDto) {
    return this.assignedCourseService.update(+id, updateAssignedCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignedCourseService.remove(+id);
  }
}
