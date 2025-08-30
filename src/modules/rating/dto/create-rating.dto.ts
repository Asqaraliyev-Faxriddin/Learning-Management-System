import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateCourseRatingDto {
  @ApiProperty()
  @IsUUID()
  courseId: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;
}