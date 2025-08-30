import {Controller,Get,Body,Req, UseGuards,Put,Post, UseInterceptors, UploadedFile,} from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { ProfileUpdateDto, PhoneUpdateDto, LastActivityDto, UpdatePasswordDto } from "./dto/create-profile.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { UserRole } from "@prisma/client";
import { Roles } from "src/common/decorators/Roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { UpdateMentorProfileDto } from "./dto/update-profile.dto";

@ApiTags("Profiles")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("my")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get("profile")
  @ApiOperation({ summary: "Foydalanuvchi profilini olish (self)" })
  async getProfile(@Req() req: Request) {
    let user = req["user"];
    return this.profilesService.myProfile(user.id);
  }

  @Put("profile")
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: "./uploads/profile",
      filename: (req, file, cb) => {
        let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        let ext = extname(file.originalname);
        cb(null, `profile-${uniqueSuffix}${ext}`);
      }
    })
  }))
  @ApiOperation({ summary: "Profilni tahrirlash (ism, rasm)" })
  @ApiConsumes("multipart/form-data")
@ApiBody({description: "Ism va profil rasmi",type: ProfileUpdateDto,})
  async updateProfile(@Req() req: Request,@UploadedFile() file: Express.Multer.File,@Body() body: ProfileUpdateDto,) {
    let user = req["user"];
    let image = file.filename
  
    return this.profilesService.profileUpdate(user.id,body,image);
  }
  @Get("last-activity")
  @ApiOperation({ summary: "Oxirgi faoliyatni olish" })
  async getLastActivity(@Req() req: Request) {
    let user = req["user"];
    return this.profilesService.getLastActivity(user.id);
  }

  @Put("last-activity")
  @ApiOperation({ summary: "Oxirgi faoliyatni yangilash" })
  @ApiBody({ type: LastActivityDto }) 
  async updateLastActivity(@Req() req: Request, @Body() body: LastActivityDto) {
    let user = req["user"];
    return this.profilesService.updateLastActivity(user.id, body);
  }

  @Post("phone/update")
  @ApiOperation({ summary: "Telefon raqamni yangilash (OTP tekshiruv bilan)" })
  async updatePhone(@Req() req: Request,@Body() body: PhoneUpdateDto,) {
    let user = req["user"];
    return this.profilesService.updatePhone(user.id, body);
  }

  @Put("password/update")
  @ApiOperation({ summary: "Parolni yangilash" })
  @ApiBody({ type: UpdatePasswordDto })
  async updatePassword(@Req() req: Request,@Body() payload: UpdatePasswordDto) {
    let user = req["user"];
    return this.profilesService.updatePassword(user.id, payload);
  }

  @Roles(UserRole.MENTOR)
  @Put("mentor-profile")
  @ApiOperation({ summary: "Mentor profili ma'lumotlarini yangilash (mentor)" })
  async updateMentorProfile(
    @Req() req: Request,
    @Body() body: UpdateMentorProfileDto
  ) {
    const user = req["user"];
    return await this.profilesService.updateMentorProfile(user.id, body);
  }
}