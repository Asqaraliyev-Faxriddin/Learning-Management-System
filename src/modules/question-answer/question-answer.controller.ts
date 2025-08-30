import {Controller,Get,Post,Patch,Delete,Body,Param,Query,UploadedFile,UseInterceptors,UseGuards,Req,} from "@nestjs/common";
import { QuestionAnswerService } from "./question-answer.service";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger";
import {QuestionsMine,QuestionsCreate,UpdateQuestonsStudent,createAnswerQuestions,updateAnswer,} from "./dto/create-question-answer.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/Roles.decorator";
import { UserRole } from "@prisma/client";

@ApiTags("Questions & Answers")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("question-answer")
export class QuestionAnswerController {
  constructor(private readonly questionAnswerService: QuestionAnswerService) {}

  @Get("mine")
  @ApiOperation({ summary: "Foydalanuvchining o'z savollari" })
  async getMyQuestions(@Req() req, @Query() query: QuestionsMine) {
    return this.questionAnswerService.QuestionsAllMine(req.user.id, query);
  }

  @Get("course/:courseId")
  @ApiOperation({ summary: "Kursga tegishli savollar" })
  async getQuestionsByCourse(
    @Query() query: QuestionsMine,
    @Req()req
  ) {
    return this.questionAnswerService.QuestionsAllMineCourse(req.user.id,query)
  }

  @Get("view/:id")
  @ApiOperation({ summary: "Bitta savolni ko'rish va read=true qilish" })
  async viewQuestion(@Param("id") questionId: string, @Req() req) {
    return this.questionAnswerService.QuestionsViewOne(questionId);
  }


  @Post("read/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({summary:"Mentor ,Admin ,Assistant"})
  async Read(@Req() req,@Param("questionId") questionId:string){
    
    return  this.questionAnswerService.QuestionsViewOne(questionId)
   
  }


  @Post("create")
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary"},
        courseId: { type: "string" },
        task: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "Yangi savol yaratish Admin,Mentor,Assistant" })
  async createQuestion(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: QuestionsCreate,
    @Req() req,
  ) {
    let filename =file.filename
    return this.questionAnswerService.QuestoinsCreate(req.user.id, payload, filename);
  }

  @Patch("update")
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary",},
        questionId: { type: "string" },
        text: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "Savolni yangilash Admin,Mentor,Assistant" })
  async updateQuestion(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UpdateQuestonsStudent,
    @Req() req,
  ) {
    let filename = file.filename
    return this.questionAnswerService.updateQuestion(req.user.id, payload, filename);
  }

  @Post("answer/create")
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary",},
        questionId: { type: "string" },
        text: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "Savolga javob yaratish Admin,Mentor" })
  async createAnswer(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: createAnswerQuestions,
    @Req() req,
  ) {
    let filename = file.filename 
    return this.questionAnswerService.createAnswer(req.user.id, payload, filename);
  }

  @Patch("answer/update/:id")
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        text: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "Javobni yangilash Admin,Mentor" })
  async updateAnswer(
    @Param("id") answerId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: updateAnswer,
    @Req() req,
  ) {
    let filename = file.filename;
    return this.questionAnswerService.updateAnswer(req.user.id, answerId, payload, filename);
  }

  @Delete("answer/:id")
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: "Javobni o'chirish Admin,Mentor" })
  async deleteAnswer(@Param("id") answerId: string) {
    return this.questionAnswerService.deleteAnswer(answerId);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
  @ApiOperation({ summary: "Savolni o'chirish" })
  async deleteQuestion(@Param("id") questionId: string, @Req() req) {
    return this.questionAnswerService.deleteQuestion(req.user.id, questionId);
  }
}
