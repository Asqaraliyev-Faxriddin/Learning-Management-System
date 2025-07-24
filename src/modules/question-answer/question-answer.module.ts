import { Module } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerController } from './question-answer.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileService } from './file/file.service';
import { FileController } from './file/file.controller';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [QuestionAnswerController, FileController],
  providers: [QuestionAnswerService,AuthGuard, FileService],
})
export class QuestionAnswerModule {}
