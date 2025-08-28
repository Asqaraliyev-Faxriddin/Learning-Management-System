import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(dto: CreateContactDto) {


    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const text = `Yangi xabar keldi:\n\nFullName: ${dto.fullName}\nTel: ${dto.phone}\nXabar: ${dto.message}`;

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text,
    });

    return { message: 'Xabaringiz muvaffaqiyatli yuborildi.' };
  }
}
