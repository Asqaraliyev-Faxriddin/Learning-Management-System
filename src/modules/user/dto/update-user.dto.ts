import { IsNotEmpty, IsString } from "class-validator"

export class ProfileUserUpdateDto{
    
    @IsNotEmpty()
    @IsString()
    fullname:string

    @IsNotEmpty()
    @IsString()
    image:string
}

export class UpdateUserDto {}
