
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService:JwtService){}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    let token =this.TokenValidation(request)
    
    if(!token) throw new UnauthorizedException()
    
        try {
            let user = await this.jwtService.verifyAsync


        } catch (error) {
            throw new UnauthorizedException()
        }

    return true
  } 

  TokenValidation(request:Request){
    let [type,token] = request.headers.authorization?.split(" ") || []

    return type == "Bearer" ?token :undefined
  }
}
