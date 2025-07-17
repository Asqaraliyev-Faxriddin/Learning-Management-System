import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export class Reset_Password{
    
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    phone:string

    @IsNotEmpty()
    @IsNumber()
    code:number

    @IsNotEmpty()
    @IsString()
    @Length(8,16)
    password:string

}