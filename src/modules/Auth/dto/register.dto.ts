import { IsNotEmpty, IsPassportNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone:string

    @IsNotEmpty()
    @IsString()
    @Length(8,16)
    password:string

    @IsString()
    @IsNotEmpty()
    @Length(5,50)
    fullname:string

    @IsNotEmpty()
    @IsString()
    otp:string

}