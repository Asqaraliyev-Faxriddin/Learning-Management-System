import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';

@Global()
@Module({
  imports:[
    JwtModule.register(JwtAccesToken)
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
