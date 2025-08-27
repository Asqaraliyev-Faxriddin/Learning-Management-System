import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [HomeworkController],
  providers: [HomeworkService,AuthGuard],
})
export class HomeworkModule {}
