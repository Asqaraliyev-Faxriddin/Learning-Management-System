import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateHomeworkDto {
  @ApiProperty({ example: "1-uyga vazifa" })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiProperty({ example: "lesonid" })
  @IsNotEmpty()
  @IsString()
  lessonId: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;
}
export class SubmitHomeworkDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  text?: string;


  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;

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



  export class HomeworkSubmissionAll{

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    limit:number


    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    offset:number
  
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    lessonId:string
  
  }


  export class HomeworksAllSubmissons{

    @Type(()=>Number)
    @IsNumber()
    @ApiPropertyOptional()
    offset?:number

    @Type(()=>Number)
    @IsNumber()
    @ApiPropertyOptional()
    limit?:number

    @IsString()
    @IsOptional()
    @ApiProperty()
    @ApiPropertyOptional()
    status?:string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsUUID()
    course_id?:string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsUUID()
    homework_id?:string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsUUID()
    user_id?:string
  }


  export class HomeworkSubmisionCheck{

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    @IsUUID()
    submission_id:string

    
    @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    approved:boolean
  
    
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    reason:string
  
  }

