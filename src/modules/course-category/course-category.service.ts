import { Injectable, NotFoundException,ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CourseCategoryAllDto, CourseCategoryCreateDto } from './dto/create-course-category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(private prisma:PrismaService){}

  async CourseCategory(payload:CourseCategoryAllDto){

    let {offset=1,limit=10,name} = payload
    
    if(Number(offset)==0){
      offset=1
    }

    let filter:any = []
    
    if(name){
      filter.push({
        name:{
          contains:name,
          mode:"insensitive"
        }
      })
    }
 
    let whereFilter:any = {}
    if(filter.length){
      whereFilter.OR = filter
    }

    let data = await this.prisma.courseCategory.findMany({
      where:whereFilter,
      include:{
        courses:true,
        
      },
      take:limit,
      skip:(offset-1)*limit,
      orderBy:{
        createdAt:"asc"
      }

    })
 
    return data
  }


  async CourseCategoryCreate(payload:CourseCategoryCreateDto){

    let {name} = payload
    let oldc = await this.prisma.courseCategory.findFirst({
      where:{
        name:payload.name
      }
    })

    if(oldc) throw new ConflictException("Category name already")

    let data = await this.prisma.courseCategory.create({
      data:{name},
      include:{
        courses:true,
        
      }
    })

    return {
      succase:true,
      message:"Succase category created",
      data
    }
  }

  async CourseCategoryOne(id:string){

    let data = await this.prisma.courseCategory.findFirst({where:{id},
    include:{
      courses:true,
      
    }})
    if(!data) throw new NotFoundException("CourseCategory not found")
  
      return {status:true,message:"succase course category",data}
  }

  async CourseCategoryUpdate(id:string,payload:CourseCategoryCreateDto){
    
    let oldcategory = await this.prisma.courseCategory.findFirst({
      where:{id}
    })

    if(!oldcategory)throw new NotFoundException("CourseCategory not found")
  
    let data = await this.prisma.courseCategory.update({
      where:{id},data:{name:payload.name},
      include:{courses:true}
    })

    return {
      status:true,
      message:"Succase course category updated",
      data
    }

   }


   async CourseCategoryDelete(id:string){

    let data = await this.prisma.courseCategory.findFirst({where:{id},
    include:{
      courses:true,
      
    }})
    if(!data) throw new NotFoundException("CourseCategory not found")
    
    let oldcategory= await this.prisma.courseCategory.delete({
      where:{id}
    })

      return {
        status:true,
        message:"Succase coursecategory deleted"
      }
  }




}
