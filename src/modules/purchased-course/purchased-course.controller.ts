import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchasedCourseService } from './purchased-course.service';
import { CreatePurchasedCourseDto } from './dto/create-purchased-course.dto';
import { UpdatePurchasedCourseDto } from './dto/update-purchased-course.dto';

@Controller('purchased-course')
export class PurchasedCourseController {
  constructor(private readonly purchasedCourseService: PurchasedCourseService) {}

  @Post()
  create(@Body() createPurchasedCourseDto: CreatePurchasedCourseDto) {
    return this.purchasedCourseService.create(createPurchasedCourseDto);
  }

  @Get()
  findAll() {
    return this.purchasedCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasedCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchasedCourseDto: UpdatePurchasedCourseDto) {
    return this.purchasedCourseService.update(+id, updatePurchasedCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasedCourseService.remove(+id);
  }
}
