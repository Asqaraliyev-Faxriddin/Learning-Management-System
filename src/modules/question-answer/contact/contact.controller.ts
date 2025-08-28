import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Contact')
@Controller('api/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @Roles(UserRole.ADMIN,UserRole.MENTOR)
  @ApiOperation({summary:"Contact"})
  async createContact(@Body() dto: CreateContactDto) {
    return this.contactService.createContact(dto);
    
  }
}
