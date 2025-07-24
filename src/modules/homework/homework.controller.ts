import {Controller,Post, Patch,Delete,Get,Param,Body,UseInterceptors,UploadedFile,UseGuards, Req, ParseUUIDPipe, Query,} from "@nestjs/common";
import { HomeworkService } from "./homework.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateHomeworkDto, HomeworksAllSubmissons, HomeworkSubmisionCheck, SubmitHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { AuthGuard } from "src/common/guards/jwt-auth.guard"; 
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/Roles.decorator"; 
import { ApiTags,ApiBearerAuth,ApiConsumes,ApiBody,ApiOperation,ApiParam,} from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

@ApiTags("Homeworks")
@ApiBearerAuth()
@Controller("api/homework")
@UseGuards(AuthGuard, RolesGuard)
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({ summary: "Yangi homework yaratish (file bilan) Admin Mentor Assistant" })
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
  @ApiBody({description: "Homework ma'lumotlari",type: CreateHomeworkDto,})
  async createHomework(@Body() dto: CreateHomeworkDto,@UploadedFile() file: Express.Multer.File,) {
    const fileName = file.filename ?? "Empty";
    return this.homeworkService.create(dto, fileName);
  }
  

  @Patch("update/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({ summary: "Yangi homework yaratish (file bilan)  Admin Mentor Assistant" })
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
  @ApiBody({description: "Homework ma'lumotlari",type: UpdateHomeworkDto,})
  async updateHomework(@Param("id") id: string,@Body() dto: UpdateHomeworkDto,@UploadedFile() file: Express.Multer.File,) {
    const fileName = file.filename ?? null;
    return this.homeworkService.update(id, dto, fileName);
  }

  @Delete(":id") 
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({ summary: "Homeworkni o'chirish (file bilan) Admin Mentor Assistant" })
  @ApiParam({ name: "id", type: Number })
  async deleteHomework(@Param("id") id: string) {
    return this.homeworkService.delete(id);
  }

  @Get(":id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({ summary: "Bitta homework detailni olish  Admin Mentor Assistant" })
  @ApiParam({ name: "id", type: Number })
  async getOne(@Param("id") id: string) {
    return this.homeworkService.detail(id);
  }

  @Get("course/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({ summary: "Kurs boyicha barcha homeworklarni olish  Admin Mentor Assistant" })
  @ApiParam({ name: "id", type: String, description: "Course ID" })
  async getByCourse(@Param("id") courseId: string) {
    return this.homeworkService.getByCourse(courseId);
  }






  @Post('submission/submit/:lessonId')
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'Submit homework (Student)' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/homework-submission',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async submitHomework(@Req() req, @Param('lessonId', ParseUUIDPipe) lessonId: string,@Body() dto: SubmitHomeworkDto,@UploadedFile() file: Express.Multer.File) {
    return this.homeworkService.submitHomework(req.user.id, lessonId, dto, file?.filename);
  }

  @Get('submissions/all')
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiOperation({ summary: 'Get all homework submissions ' })
  async getAllSubmissions(@Query() query: Partial<HomeworksAllSubmissons>) {
    return this.homeworkService.HomeworksubmissionAll(query);
  }

  @Get('submissions/single/:id')
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiOperation({ summary: 'Get single submission by ID' })
  async getSingleSubmission(@Param('id', ParseUUIDPipe) id: string,@Req() req) {
    return this.homeworkService.HomeworkSubmissionOne(req.user.id,id);
  }

  @Post('submission/check')
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiOperation({ summary: 'Approve or reject submission' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/homework-check',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        submission_id: { type: 'string' },
        approved: { type: 'boolean' },
        reason: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async checkSubmission(@Req() req,@Body() dto: HomeworkSubmisionCheck,@UploadedFile() file: Express.Multer.File) {
    return this.homeworkService.HomeworksubmisionsCheck(req.user.id, dto, file?.filename);
  }


  @Post('submit/:lessonId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('STUDENT')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/homework',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Uyga vazifa topshirish' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async submitHomeworkUser(@Req() req,@Param('lessonId') lessonId: string,@UploadedFile() file: Express.Multer.File,@Body() dto: SubmitHomeworkDto,) {
    return this.homeworkService.submitHomeworkUser(req.user.id,lessonId, dto, file);
  }
}



