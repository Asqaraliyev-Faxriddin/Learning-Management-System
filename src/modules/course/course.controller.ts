import {Controller,Get,Post,Body,Patch,Param,Delete,Query,UseInterceptors,UploadedFile,UseGuards, UploadedFiles, Req,} from "@nestjs/common";
import {CourseAllDto,CreateCourseDto,UpdateCourseDto,AssistantAddCourse,CourseMentorAllDto,} from "./dto/create-course.dto";
import { CourseService } from "./course.service";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiConsumes, ApiBearerAuth } from "@nestjs/swagger";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/Roles.decorator";
import { CourseLevel, UserRole } from "@prisma/client";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
@ApiTags("Course")
@ApiBearerAuth()
@Controller("course")
@UseGuards(AuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get("all")
  @ApiOperation({ summary: "Barcha course larni olish (published only)" })
  courseAll(@Query() payload: CourseAllDto) {
    return this.courseService.CourseAll(payload);
  }

  @Get("full/all")
  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @ApiOperation({ summary: "Barcha full course larni olish (barcha relationlar bilan) Admin Mentor Assistant" })
  courseFullAll(@Query() payload: CourseAllDto) {
    return this.courseService.CoursefullAll(payload);
  }

  @Get("one/:id")
  @ApiOperation({ summary: "Bitta course ni olish" })
  courseOne(@Req()req,@Param("id") id: string) {
    return this.courseService.CourseOne(req.user.id,id);
  }

  @Roles(UserRole.ADMIN,UserRole.MENTOR,UserRole.ASSISTANT)
  @Get("full/one/:id")
  @ApiOperation({ summary: "Bitta full course ni olish (barcha relationlar bilan) Admin Mentor Assistant" })
  courseFullOne(@Param("id") id: string) {
    return this.courseService.CoursefullOne(id);
  }

  @Get("my/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Mentor o'zi yaratgan course ni olish  Admin Mentor "  })
  myCourse(@Req()req,@Param("id") id: string) {
    return this.courseService.myCourse(req.user.id,id);
  }

  @Get("mentor/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Mentor yaratgan barcha course lar  Admin Mentor " })
  coursesMentorAll(@Param("id") id: string, @Query() payload: CourseMentorAllDto) {
    return this.courseService.CoursesMentorAll(id, payload);
  }

  @Get("assigned/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Assistant ga assign qilingan course lar Admin Mentor " })
  assignedCourses(@Param("id") id: string, @Query() payload: CourseMentorAllDto) {
    return this.courseService.courses_assiged(id, payload);
  }

  @Get("assistant/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Assistant biriktirilgan course ni olish Admin Mentor " })
  foundAssistant(@Param("id") id: string) {
    return this.courseService.foundAssistant(id);
  }

  @Post("assistant/add")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Assistant ni course ga biriktirish  Admin Mentor" })
  addAssistant(@Body() payload: AssistantAddCourse) {
    return this.courseService.add_Assistant(payload);
  }

  @Post("create")
  @Roles(UserRole.ADMIN,UserRole.MENTOR )
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'introvideo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.fieldname === 'banner') cb(null, './uploads/banner');
            else if (file.fieldname === 'introvideo') cb(null, './uploads/Introvideo');
          },
          filename: (req, file, cb) => {
            const uniqueName = Date.now() + Math.round(Math.random() * 1e9) + '-' + file.originalname;
            cb(null, uniqueName);
          },
        }),
      }
    )
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        banner: { type: 'string', format: 'binary' },
        introvideo: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        about: { type: 'string' },
        price: { type: 'string' },
        level: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] },
        categoryId: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: "Yangi course yaratish (mentor va admin uchun)" })
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  async createCourse(@Req() req: Request,@UploadedFiles()files: {banner?: Express.Multer.File[];introvideo?: Express.Multer.File[];},
    @Body() payload: CreateCourseDto
  ) {
    const bannerFilename = files.banner?.[0]?.filename || null;
    const introFilename = files.introvideo?.[0]?.filename || null;

    return this.courseService.createCourse(req["user"].id, payload, bannerFilename!, introFilename!);
  }

  @Patch("update-course")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'banner', maxCount: 1 },
        { name: 'introvideo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.fieldname === 'banner') cb(null, './uploads/banner');
            else if (file.fieldname === 'introvideo') cb(null, './uploads/Introvideo');
          },
          filename: (req, file, cb) => {
            const uniqueName =
              Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
            cb(null, uniqueName);
          },
        }),
      }
    )
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        banner: { type: 'string', format: 'binary' },
        introvideo: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        about: { type: 'string' },
        price: { type: 'string' },
        level: { type: 'string', enum: Object.values(CourseLevel) },
        cursecategoryId: { type: 'string' },
      },
    },
  })
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: "Course ni yangilash (mentor tomonidan)" })
  async updateMentorCourse(
    @Query("courseId") courseId: string,
    @UploadedFiles()
    files: {
      banner?: Express.Multer.File[];
      introvideo?: Express.Multer.File[];
    },
    @Body() payload: UpdateCourseDto
  ) {
    const bannerFilename = files?.banner?.[0]?.filename || undefined;
    const introFilename = files?.introvideo?.[0]?.filename || undefined;
  
    return this.courseService.updateMentorCourse(
      courseId,
      payload,
      bannerFilename,
      introFilename,
    );
  }
  

  @Patch("publish/:id")
  @Roles(UserRole.ADMIN,)
  @ApiOperation({ summary: "Course ni publish qilish Admin Mentor " })
  coursePublish(@Param("id") id: string) {
    return this.courseService.CoursePublish(id);
  }

  @Patch("unpublish/:id")
  @Roles(UserRole.ADMIN,)
  @ApiOperation({ summary: "Course ni unpublish qilish Admin Mentor" })
  courseUnPublish(@Param("id") id: string) {
    return this.courseService.CourseunPublish(id);
  }

  @Patch("update-mentor-id/:id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Course ga mentor biriktirish Admin Mentor" })
  courseUpdateMentor(@Param("id") id: string, @Query("mentor_id") mentor_id: string) {
    return this.courseService.CourseUpdateMentor(id, mentor_id);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({ summary: "Course ni o'chirish  Admin Mentor" })
  courseDelete(@Param("id") id: string) {
    return this.courseService.Coursedelete(id);
  }
}