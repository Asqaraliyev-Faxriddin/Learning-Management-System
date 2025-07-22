import { ApiProperty } from "@nestjs/swagger"
import { ExamAnswer } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateExamDto {
    
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({example:"rtdfyvbhjmds"})
    lessonbolimId:string

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({example:"isddded"})
    id:string

    @IsEnum(ExamAnswer)
    @IsNotEmpty()
    @ApiProperty({example:"variantA",enum:ExamAnswer})
    answer: ExamAnswer
}


export class createManyQuestions{

    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"questions"})
    question :string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"variant"})
    variantA :string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"variant"})
    variantB :string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"variant"})
    variantC :string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"variant"})
    variantD :string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"answer",enum:ExamAnswer})
    answer :ExamAnswer

    
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    @ApiProperty({example:"lessonbolimId"})
    lessonbolimId :string
}