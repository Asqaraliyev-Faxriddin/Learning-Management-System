import { Module } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerController } from './question-answer.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileService } from './file/file.service';
import { FileController } from './file/file.controller';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';

@Module({
  imports:[JwtModule.register(JwtAccesToken)],
  controllers: [QuestionAnswerController, FileController,ContactController],
  providers: [QuestionAnswerService,AuthGuard, FileService,ContactService],
})
export class QuestionAnswerModule {}
