import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
