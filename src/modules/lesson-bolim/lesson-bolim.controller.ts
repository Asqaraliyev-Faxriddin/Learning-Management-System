import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonBolimService } from './lesson-bolim.service';
import { CreateLessonBolimDto } from './dto/create-lesson-bolim.dto';
import { UpdateLessonBolimDto } from './dto/update-lesson-bolim.dto';

@Controller('lesson-bolim')
export class LessonBolimController {
  constructor(private readonly lessonBolimService: LessonBolimService) {}

  @Post()
  create(@Body() createLessonBolimDto: CreateLessonBolimDto) {
    return this.lessonBolimService.create(createLessonBolimDto);
  }

  @Get()
  findAll() {
    return this.lessonBolimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonBolimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonBolimDto: UpdateLessonBolimDto) {
    return this.lessonBolimService.update(+id, updateLessonBolimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonBolimService.remove(+id);
  }
}
