// lesson-file.controller.ts

import {
    Controller,
    Get,
    Param,
    Req,
    Res,
    UseGuards,
    ParseUUIDPipe,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { AuthGuard } from 'src/common/guards/jwt-auth.guard'; 
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
  
  @ApiTags('Files')
  @ApiBearerAuth()
  @UseGuards( AuthGuard)
  @Controller('files/private')
  export class FileController {
    constructor(private readonly FileService: FileService) {}
  
    @Get('homework/:lessonId/:name')
    async getHomeworkFile(
      @Param('lessonId', new ParseUUIDPipe()) lessonId: string,
      @Param('name') name: string,
      @Req() req,
      @Res() res: Response,
    ) {
      const fileBuffer = await this.FileService.FileHomework(
        req.user.id,
        lessonId,
        name,
      );
  
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${encodeURIComponent(name)}"`,
      );
  
      return res.send(fileBuffer);
    }
  }
  