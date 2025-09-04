import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import axios from 'axios';
import { Request } from 'express';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}
  private sentUsers = new Map<string, number>(); 

  async createContact(dto: CreateContactDto, req: Request) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
  
    // Foydalanuvchi IP yoki identifier olish
    const forwarded = req.headers['x-forwarded-for'];
    let ip: string;
  
    if (typeof forwarded === 'string') {
      ip = forwarded.split(',')[0].trim();
    } else if (Array.isArray(forwarded)) {
      ip = forwarded[0];
    } else if (req.ip) {
      ip = req.ip;
    } else {
      ip = 'unknown';
    }
  
    const now = Date.now();
    const lastSent = this.sentUsers.get(ip) || 0;
  
    if (now - lastSent < 10 * 60 * 1000) {
      return { message: 'Siz allaqachon xabar yuborgansiz. Iltimos 10 minutdan keyin yana urinib ko‘ring.' };
    }
  
    // Xabarni bazaga yozish
    await this.prisma.contact.create({
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        message: dto.message,
        ip,
        createdAt: new Date(), // agar modelda mavjud bo'lsa
      },
    });
  
    const text = `Yangi xabar keldi:\n\nFullName: ${dto.fullName}\nTel: ${dto.phone}\nXabar: ${dto.message}`;
  
    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
      });
  
      this.sentUsers.set(ip, now);
  
      return { message: 'Xabaringiz muvaffaqiyatli yuborildi.' };
    } catch (err) {
      console.error('Xabar yuborishda xatolik:', err);
      return { message: 'Xabar yuborishda xatolik yuz berdi.' };
    }
  }
  
}
