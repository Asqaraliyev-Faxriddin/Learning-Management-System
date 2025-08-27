import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export class CreateLessonFileDto{


    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @ApiProperty({example:"cfvgbhnjmdsd",description:"Lesson ID"})
    lessonId:string

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @Length(3,200)
    @ApiProperty({example:"Salom vazifa",description:"Notes"})
    notes:string
}