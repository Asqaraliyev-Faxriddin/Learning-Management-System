import {Controller,Post,Get,Param,Body,UseGuards,UploadedFile,UseInterceptors,} from "@nestjs/common";
import { LessonFileService } from "./lesson-file.service";
import { CreateLessonFileDto } from "./dto/create-lesson-file.dto";
import {ApiBearerAuth,ApiBody,ApiConsumes,ApiOperation,ApiTags,} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRole } from "@prisma/client";
import { Roles } from "src/common/decorators/Roles.decorator";

@ApiTags("Lesson File")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("lesson-file")
export class LessonFileController {
  constructor(private readonly lessonFileService: LessonFileService) {}

  @Post("create")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Lesson fayl yaratish Admin,Mentor" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Yangi LessonFile qo'shish",
    type: CreateLessonFileDto,
  })
  @UseInterceptors(FileInterceptor("file"))
  async createLessonFile(
    @Body() body: CreateLessonFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file?.filename;
    return this.lessonFileService.CreateLessonFile(body, filename);
  }

  @Get(":id")
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: "Lesson file olish Admin,Mentor" })
  async getOne(@Param("id") id: string) {
    return this.lessonFileService.lessonfilesone(id);
  }

  @Get("lesson/:id")
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: "Faqat lesson file Admin,Mentor" })
  async getOnlyLessonFile(@Param("id") id: string) {
    return this.lessonFileService.Lesson(id);
  }

  @Get("all")
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: "Barcha lesson filelar Admin,Mentor" })
  async LessonAll() {
    return this.lessonFileService.LessonAll();
  }
}
  