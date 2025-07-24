import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class FileService {
    constructor(private prisma:PrismaService){}


    async FileBanner(name:string){
        
        return `http://localhost:${process.env.PORT || 3000}/banner/url/${name}`
    }

    
    async FileIntrovideo(name:string){
        
        return `http://localhost:${process.env.PORT || 3000}/introvideo/url/${name}`
    }

    
    async FileProfile(name:string){
        
        return `http://localhost:${process.env.PORT || 3000}/profile/url/${name}`
    }


    
}
