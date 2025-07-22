import {Body,Controller,Post,Get,Param,Patch,Delete, UseGuards,} from "@nestjs/common";
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
  @ApiOperation({ summary: "Berilgan lessonGroupId bo'yicha testlar ro'yxatini olish" })
  getByLessonGroupId(@Param("lessonGroupId") lessonGroupId: string) {
    return this.examService.getByLessonGroupId(lessonGroupId);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Get("detail/:id")
  @ApiOperation({ summary: "LessonGroupga tegishli testlar va bo'lim haqida malumot" })
  getLessonGroupDetails(@Param("id") id: string) {
    return this.examService.getLessonGroupDetails(id);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Get("one/:id")
  @ApiOperation({ summary: "Bitta test haqida malumot olish" })
  getExamDetail(@Param("id") id: string) {
    return this.examService.getExamDetail(id);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Post()
  @ApiOperation({ summary: "Yangi test qo'shish" })
  createExam(@Body() dto: createManyQuestions) {
    return this.examService.createExam(dto);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Post("many")
  @ApiOperation({ summary: "Bir nechta testlarni qo'shish" })
  createMany(@Body() dto: createManyQuestions) {
    return this.examService.createMany(dto);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Patch(":id")
  @ApiOperation({ summary: "Testni tahrirlash" })
  updateExam(
    @Param("id") id: string,
    @Body() dto: Partial<createManyQuestions>,
  ) {
    return this.examService.updateExam(id, dto);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @Delete(":id")
  @ApiOperation({ summary: "Testni o'chirish" })
  deleteExam(@Param("id") id: string) {
    return this.examService.deleteExam(id);
  }

  @Roles(UserRole.STUDENT)
  @Post("pass")
  @ApiOperation({ summary: "Foydalanuvchi testga javob beradi" })
  passExam(@Body() dto: CreateExamDto) {
    return this.examService.ExamPass(dto);
  }

  @Roles(UserRole.ADMIN)
  @Get("result/all")
  @ApiOperation({ summary: "Barcha test natijalarini olish" })
  getAllResults() {
    return this.examService.getAllResults();
  }

  @Roles(UserRole.ADMIN)
  @Get("result/:id")
  @ApiOperation({ summary: "Berilgan LessonGroup bo'yicha test natijalarini olish" })
  getResultsByLessonGroup(@Param("id") id: string) {
    return this.examService.getResultsByLessonGroup(id);
  }
}
