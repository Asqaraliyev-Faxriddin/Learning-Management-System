import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('Exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

}
