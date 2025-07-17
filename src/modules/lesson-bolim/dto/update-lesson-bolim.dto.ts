import { PartialType } from '@nestjs/swagger';
import { CreateLessonBolimDto } from './create-lesson-bolim.dto';

export class UpdateLessonBolimDto extends PartialType(CreateLessonBolimDto) {}
