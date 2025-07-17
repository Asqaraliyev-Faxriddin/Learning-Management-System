import { IsNotEmpty, IsPassportNumber, IsPhoneNumber, IsString } from "class-validator";


export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber("UZ")
    phone:string

    @IsNotEmpty()
    @IsString()
    password:string

}