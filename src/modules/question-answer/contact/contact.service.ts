import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(dto: CreateContactDto) {
    let data = await  this.prisma.contact.create({
      data: dto,
    });
  
    return  { message: 'Xabaringiz muvaffaqiyatli yuborildi.' };
  }

  
}
