import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [ExamController],
  providers: [ExamService,AuthGuard],
})
export class ExamModule {}
