import {Controller,Post, Patch,Delete,Get,Param,Body,UseInterceptors,UploadedFile,UseGuards,} from "@nestjs/common";
import { HomeworkService } from "./homework.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { AuthGuard } from "src/common/guards/jwt-auth.guard"; 
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/Roles.decorator"; 
import { ApiTags,ApiBearerAuth,ApiConsumes,ApiBody,ApiOperation,ApiParam,} from "@nestjs/swagger";

@ApiTags("Homeworks")
@ApiBearerAuth()
@Controller("api/homework")
@UseGuards(AuthGuard, RolesGuard)
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Roles("MENTOR", "ADMIN", "ASSISTANT")
  @ApiOperation({ summary: "Yangi homework yaratish (file bilan)" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/homework",
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @ApiBody({description: "Homework malumotlari",type: CreateHomeworkDto,})
  async createHomework(@Body() dto: CreateHomeworkDto,@UploadedFile() file: Express.Multer.File,) {
    const fileName = file.filename ?? "Empty";
    return this.homeworkService.create(dto, fileName);
  }

  @Patch(":id")
  @Roles("MENTOR", "ADMIN", "ASSISTANT")
  @ApiOperation({ summary: "Homeworkni yangilash (file almashtirish)" })
  @ApiParam({ name: "id", type: Number, description: "Homework ID" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/homework",
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @ApiBody({ type: UpdateHomeworkDto })
  async updateHomework(@Param("id") id: string,@Body() dto: UpdateHomeworkDto,@UploadedFile() file: Express.Multer.File,) {
    const fileName = file.filename ?? "Empty";
    return this.homeworkService.update(id, dto, fileName);
  }

  @Delete(":id")
  @Roles("MENTOR", "ADMIN", "ASSISTANT")
  @ApiOperation({ summary: "Homeworkni o'chirish (file bilan)" })
  @ApiParam({ name: "id", type: Number })
  async deleteHomework(@Param("id") id: string) {
    return this.homeworkService.delete(id);
  }

  @Get(":id")
  @Roles("MENTOR", "ADMIN", "ASSISTANT")
  @ApiOperation({ summary: "Bitta homework detailni olish" })
  @ApiParam({ name: "id", type: Number })
  async getOne(@Param("id") id: string) {
    return this.homeworkService.detail(id);
  }

  @Get("course/:id")
  @Roles("MENTOR", "ADMIN", "ASSISTANT")
  @ApiOperation({ summary: "Kurs boyicha barcha homeworklarni olish" })
  @ApiParam({ name: "id", type: String, description: "Course ID" })
  async getByCourse(@Param("id") courseId: string) {
    return this.homeworkService.getByCourse(courseId);
  }
}
