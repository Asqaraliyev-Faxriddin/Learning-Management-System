import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class QuestionsMine{

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    offset:number

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional()
    limit:number

    
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    read:boolean

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    answered:boolean

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    course_id:string
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