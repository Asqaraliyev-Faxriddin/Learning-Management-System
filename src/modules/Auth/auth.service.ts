import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAccesToken, JwtRefreshToken } from 'src/common/config/jwt';
import { Token_activate } from 'src/common/types/token';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma:PrismaService,private jwtServise:JwtService
    ){}


    async generateToken(payload:Token_activate,token_vertifcation?:boolean){

        let AccessToken = await this.jwtServise.signAsync(payload,JwtAccesToken)
        let RefreshToken = await this.jwtServise.signAsync(payload,JwtRefreshToken)

        if(token_vertifcation == true){
            return AccessToken
        } else{
            return {
                AccessToken,
                RefreshToken
            }
        }

    }

}
