import {Controller,Get,Param,Req,Res,UseGuards,ParseUUIDPipe,} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
  
  @ApiTags('Files')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Controller('Files')
  export class FileController {
    constructor(private readonly fileService: FileService) {}
  
    @Get('homework/:lessonId/:name')
    @ApiOperation({summary:"Homework korish"})
    async getHomeworkFile(
      @Param('lessonId', ParseUUIDPipe) lessonId: string,
      @Param('name') name: string,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      let buffer = await this.fileService.FileHomework(req["user"].id, lessonId, name);
      return res.send(buffer);
    }
  
    @Get('homework-submission/:lessonId/:name')
    @ApiOperation({summary:"Homework Submission korish"})
    async getHomeworkSubmission(
      @Param('lessonId', ParseUUIDPipe) lessonId: string,
      @Param('name') name: string,
      @Req() req: Request,
      @Res() res: Response,
    ) {
      let buffer = await this.fileService.FileHomeworkSubmission(req["user"].id, lessonId, name);
      return res.send(buffer);
    }
  
    @Get('homework-check/:lessonId/:name')
    @ApiOperation({summary:"Homework check olish"})
    async getHomeworkCheck(
      @Param('lessonId', ParseUUIDPipe) lessonId: string,
      @Param('name') name: string,
      @Req() req: Request,
      @Res() res:Response
    ) {
      let buffer = await this.fileService.FileHomeworkcheck(req["user"].id, lessonId, name,);
      return  res.send(buffer)
    }
  
    @Get('video/:lessonId/:hlsf')
    @ApiOperation({summary:"Video olish"})
    async getLessonVideo(
      @Param('lessonId', ParseUUIDPipe) lessonId: string,
      @Param('hlsf') hlsf: string,
      @Req() req: Request,
      @Res() res:Response

    ) {
      let buffer = await this.fileService.getLessonVideo(req["user"].id, lessonId, hlsf);
      return res.send(buffer)
    }
  
  
 
    @Get('banner/:name')
    @ApiOperation({summary:"Banner olish"})
    async getBanner(@Param('name') name: string) {
      let url = await this.fileService.FileBanner(name);
      return { url };
    }
  
    @Get('introvideo/:name')
    @ApiOperation({summary:"Intro video olish"})
    async getIntroVideo(@Param('name') name: string) {
      let url = await this.fileService.FileIntrovideo(name);
      return { url };
    }
  
    @Get('profile/:name')
    @ApiOperation({summary:"Profile olish"})
    async getProfile(@Param('name') name: string) {
      let url = await this.fileService.FileProfile(name);
      return { url };
    }
}
  