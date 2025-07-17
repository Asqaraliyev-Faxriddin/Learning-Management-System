
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    let token =this.TokenValidation(request)
    
    if(!token) throw new UnauthorizedException()
    
        try {
            let user = await this.jwtService.verifyAsync(token)
            request.user = user
            return true

        } catch (error) {
            throw new UnauthorizedException()
        }

  } 

  TokenValidation(request:Request){
    let [type,token] = request.headers.authorization?.split(" ") || []

    return type == "Bearer" ?token :undefined
  }
}
