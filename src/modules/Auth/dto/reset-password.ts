import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class Reset_Password{
    
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    phone:string

    @IsNotEmpty()
    @IsNumber()
    otp:string

    @IsNotEmpty()
    @IsString()
    @Length(8,16)
    password:string

}