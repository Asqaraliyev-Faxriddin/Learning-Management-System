import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHomeworkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lessonId: string;
}


export class SubmitHomeworkDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  text?: string;
}


export class CheckHomeworkDto {
    @ApiProperty()
    @IsNumber()
    submissionId: number;
  
    @ApiProperty()
    @IsBoolean()
    approved: boolean;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    reason?: string;
  }

