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