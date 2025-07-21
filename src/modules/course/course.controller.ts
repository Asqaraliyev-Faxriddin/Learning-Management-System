import {Controller,Get,Post,Body,Patch,Param,Delete,Query,UseInterceptors,UploadedFile,UseGuards,} from "@nestjs/common";
import {CourseAllDto,CreateCourseDto,UpdateCourseDto,AssistantAddCourse,CourseMentorAllDto,} from "./dto/create-course.dto";
import { CourseService } from "./course.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiConsumes, ApiBearerAuth } from "@nestjs/swagger";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/Roles.decorator";
import { UserRole } from "@prisma/client";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";

@ApiTags("Course")
@ApiBearerAuth()
@Controller("course")
@UseGuards(AuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get("all")
  @ApiOperation({ summary: "Barcha course larni olish (published only)" })
  courseAll(@Query() payload: CourseAllDto) {
    return this.courseService.CourseAll(payload);
  }

  @Get("full/all")
  @ApiOperation({ summary: "Barcha full course larni olish (barcha relationlar bilan)" })
  courseFullAll(@Query() payload: CourseAllDto) {
    return this.courseService.CoursefullAll(payload);
  }

  @Get("one/:id")
  @ApiOperation({ summary: "Bitta course ni olish" })
  courseOne(@Param("id") id: string) {
    return this.courseService.CourseOne(id);
  }

  @Get("full/one/:id")
  @ApiOperation({ summary: "Bitta full course ni olish (barcha relationlar bilan)" })
  courseFullOne(@Param("id") id: string) {
    return this.courseService.CoursefullOne(id);
  }

  @Get("my/:id")
  @ApiOperation({ summary: "Mentor o‘zi yaratgan course ni olish" })
  myCourse(@Param("id") id: string) {
    return this.courseService.myCourse(id);
  }

  @Get("mentor/:id")
  @ApiOperation({ summary: "Mentor yaratgan barcha course lar" })
  coursesMentorAll(@Param("id") id: string, @Query() payload: CourseMentorAllDto) {
    return this.courseService.CoursesMentorAll(id, payload);
  }

  @Get("assigned/:id")
  @ApiOperation({ summary: "Assistant ga assign qilingan course lar" })
  assignedCourses(@Param("id") id: string, @Query() payload: CourseMentorAllDto) {
    return this.courseService.courses_assiged(id, payload);
  }

  @Get("assistant/:id")
  @ApiOperation({ summary: "Assistant biriktirilgan course ni olish" })
  foundAssistant(@Param("id") id: string) {
    return this.courseService.foundAssistant(id);
  }

  @Post("assistant/add")
  @ApiOperation({ summary: "Assistant ni course ga biriktirish" })
  addAssistant(@Body() payload: AssistantAddCourse) {
    return this.courseService.add_Assistant(payload);
  }

  @Post("create")
  @UseInterceptors(
    FileInterceptor("banner", {
      storage: diskStorage({
        destination: "./uploads/banner",
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(UserRole.MENTOR,UserRole.ADMIN)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        banner: {
          type: "string",
          format: "binary",
        },
        name: { type: "string" },
        about: { type: "string" },
        price: { type: "string" },
        level: { type: "string", enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"] },
        categoryId: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "Yangi course yaratish (mentor tomonidan)" })
  async createCourse(
    @Query("mentorId") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreateCourseDto,
  ) {
    return this.courseService.createCourse(id, payload, file.filename);
  }

  @Patch("update-mentor")
  @UseInterceptors(
    FileInterceptor("introVideo", {
      storage: diskStorage({
        destination: "./uploads/banner",
        filename: (req, file, cb) => {
          const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Mentor tomonidan course ni yangilash (video bilan)" })
  async updateMentorCourse(
    @Query("courseId") courseId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UpdateCourseDto,
  ) {
    return this.courseService.updateMentorCourse(courseId, payload, file);
  }

  @Patch("publish/:id")
  @ApiOperation({ summary: "Course ni publish qilish" })
  coursePublish(@Param("id") id: string) {
    return this.courseService.CoursePublish(id);
  }

  @Patch("unpublish/:id")
  @ApiOperation({ summary: "Course ni unpublish qilish" })
  courseUnPublish(@Param("id") id: string) {
    return this.courseService.CourseunPublish(id);
  }

  @Patch("update-mentor-id/:id")
  @ApiOperation({ summary: "Course ga mentor biriktirish" })
  courseUpdateMentor(@Param("id") id: string, @Query("mentor_id") mentor_id: string) {
    return this.courseService.CourseUpdateMentor(id, mentor_id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Course ni o'chirish" })
  courseDelete(@Param("id") id: string) {
    return this.courseService.Coursedelete(id);
  }
}
