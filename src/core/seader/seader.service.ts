import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class SeaderService implements OnModuleInit {

    private loger = new Logger("Seader")

    constructor(private prisma:PrismaService){}


    async onModuleInit() {
                 
        await this.CreateSuperadmin()
    }

    async CreateSuperadmin() {
        await this.prisma.users.createMany({
          data: [
            {
              fullName: 'Ali Valiyev',
              password: '12345678',
              phone: '9000000000',
              role: UserRole.STUDENT,
              image: 'default.png',
            },
            {
              fullName: 'Faxriddin Asqaraliyev',
              password: '12345678',
              phone: '903641207',
              role: UserRole.ADMIN,
              image: 'default.png',
            },
           
          ],
          skipDuplicates: true,
        });
      
        this.loger.log("Admin va User yaratildi.")
      }
}
