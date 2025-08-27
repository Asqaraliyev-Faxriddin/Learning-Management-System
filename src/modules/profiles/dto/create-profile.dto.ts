import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator"

export class ProfileUpdateDto {
    
    @IsOptional()
    @ApiPropertyOptional({example:"Asqaraliyev Faxriddin",description:"Asqaraliyev Faxriddin"})
    @IsString()
    fullName?:string

    @IsOptional()
    @ApiPropertyOptional({
    type: "string",
    format: "binary",
    description: "Profil rasmi",
  })
  image?: any;

}

export class PhoneUpdateDto {
  
    @ApiProperty({ example: "123456", description: "SMS orqali yuborilgan OTP kodi" })
    @IsNotEmpty()
    @IsString()
    otp: string;
  
    @ApiProperty({ example: "+998901234567", description: "Yangi telefon raqami" })
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone: string;
  }



  export class LastActivityDto {
    @ApiProperty()
    @IsString()
    url: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    courseId: string;
  
    @ApiProperty()
    @IsUUID()
    lessonId: string;
  
    @ApiProperty()
    @IsUUID()
    groupId: string;
  }


  export class UpdatePasswordDto {
    @ApiProperty()
    @IsString()
    oldPassword: string;
  
    @ApiProperty()
    @IsString()
    newPassword: string;
  }
  