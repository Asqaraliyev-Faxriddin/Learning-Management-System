import { IsEnum, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { EverificationTypes } from "src/common/types/verification";

export class SendOtpDto {
 
    @IsNotEmpty()
    @IsEnum(EverificationTypes)
    type:EverificationTypes

    @IsMobilePhone("uz-UZ")
    phone:string
}

export class VerificationOtpDto {

    @IsString()
    code:string
}

export class VerifyOtpDto {
    
    
    @IsNotEmpty()
    @IsString()
    type:string

    
    @IsNotEmpty()
    @IsString()
    phone:string

    @IsNotEmpty()
    @IsString()
    otp:string
}


export class IChekOtp {
    @IsString()
    @IsNotEmpty()
    type:string

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone:string
    otp:string
}