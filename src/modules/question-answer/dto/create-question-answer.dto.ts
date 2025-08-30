import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class QuestionsMine {
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsOptional()
  @ApiPropertyOptional({ enum: [true, false] })
  @IsIn([true, false, 'true', 'false'])
  read: boolean | string;

  @IsOptional()
  @ApiPropertyOptional({ enum: [true, false] })
  @IsIn([true, false, 'true', 'false'])
  answered: boolean | string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  course_id: string;
}


export class QuestionsCreate {
  @ApiProperty()
  @IsString()
  task: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file: any;


  @ApiProperty()
  @IsString()
    @IsUUID()
  courseId:string

}

export class UpdateQuestonsStudent{

 @ApiPropertyOptional()
 @IsOptional()
@IsString()
 @IsUUID()
questionId: string

@ApiPropertyOptional()
@IsOptional()
@IsString()
text: string

@ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file: any;



}



export class createAnswerQuestions{

    @ApiProperty()
    @IsString()
    @IsUUID()
   questionId: string
   
   @ApiProperty()
   @IsString()
   text: string
   
   @ApiProperty({
       type: 'string',
       format: 'binary',
     })
     @IsOptional()
     file: any;
   
   
   
   }


   export class updateAnswer{

@ApiPropertyOptional()
@IsOptional()
@IsString()
text: string

   }