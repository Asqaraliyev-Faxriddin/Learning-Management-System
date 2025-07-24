import {Body,Controller,Post,Get,Param,Patch,Delete, UseGuards, Req,} from "@nestjs/common";
import { ExamService } from "./exam.service";
import {CreateExamDto,createManyQuestions,} from "./dto/create-exam.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/Roles.decorator";
import { UserRole } from "@prisma/client";

@ApiTags("Exams")
@Controller("exams")
@UseGuards(AuthGuard,RolesGuard)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Roles(UserRole.STUDENT)
  @Get(":lessonGroupId")
  @ApiOperation({ summary: "Berilgan lessonGroupId bo'yicha testlar ro'yxatini olish Student" })
  getByLessonGroupId(@Req()req,@Param("lessonGroupId") lessonGroupId: string) {
    return this.examService.getByLessonGroupId(req.user.id,lessonGroupId);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Get("detail/:id")
  @ApiOperation({ summary: "LessonGroupga tegishli testlar va bo'lim haqida malumot Admin Mentor" })
  getLessonGroupDetails(@Param("id") id: string) {
    return this.examService.getLessonGroupDetails(id);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Get("one/:id")
  @ApiOperation({ summary: "Bitta test haqida malumot olish Admin Mentor" })
  getExamDetail(@Param("id") id: string) {
    return this.examService.getExamDetail(id);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Post()
  @ApiOperation({ summary: "Yangi test qo'shish Admin Mentor" })
  createExam(@Body() dto: createManyQuestions) {
    return this.examService.createExam(dto);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Post("many")
  @ApiOperation({ summary: "Bir nechta testlarni qo'shish Admin Mentor" })
  createMany(@Body() dto: createManyQuestions) {
    return this.examService.createMany(dto);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Patch(":id")
  @ApiOperation({ summary: "Testni tahrirlash Admin Mentor" })
  updateExam(
    @Param("id") id: string,
    @Body() dto: Partial<createManyQuestions>,
    @Req()req,
  ) {
    return this.examService.updateExam(id, dto);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Delete(":id")
  @ApiOperation({ summary: "Testni o'chirish Admin Mentor" })
  deleteExam(@Req()req,@Param("id") id: string) {
    return this.examService.deleteExam(id);
  }

  @Roles(UserRole.STUDENT)
  @Post("pass")
  @ApiOperation({ summary: "Foydalanuvchi testga javob beradi Student" })
  passExam(@Req()req,@Body() dto: CreateExamDto) {
    return this.examService.ExamPass(req.user.id,dto);
  }

  @Roles(UserRole.ADMIN)
  @Get("result/all")
  @ApiOperation({ summary: "Barcha test natijalarini olish Admin" })
  getAllResults(@Req()req,) {
    return this.examService.getAllResults();
  }

  @Roles(UserRole.ADMIN)
  @Get("result/:id")
  @ApiOperation({ summary: "Berilgan LessonGroup bo'yicha test natijalarini olish Admin" })
  getResultsByLessonGroup(@Req()req,@Param("id") id: string) {
    return this.examService.getResultsByLessonGroup(id);
  }
}
