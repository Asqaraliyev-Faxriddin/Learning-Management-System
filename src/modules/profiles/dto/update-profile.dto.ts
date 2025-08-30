import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsInt, IsOptional, IsUrl, Min } from "class-validator";

export class UpdateMentorProfileDto {
  @ApiPropertyOptional({ example: 3, description: "Tajriba yillari" })
  @IsInt()
  @Min(0)
  experience: number;

  @ApiPropertyOptional({ example: "Full-stack software engineer", description: "Kasbi" })
  @IsString()
  job: string;

  @ApiPropertyOptional({ example: "Men haqimda qisqacha ma'lumot", required: false })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiPropertyOptional({ example: "https://t.me/username", required: false })
  @IsUrl()
  @IsOptional()
  telegram?: string;

  @ApiPropertyOptional({ example: "https://facebook.com/username", required: false })
  @IsUrl()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional({ example: "https://instagram.com/username", required: false })
  @IsUrl()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({ example: "https://linkedin.com/in/username", required: false })
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @ApiPropertyOptional({ example: "https://github.com/username", required: false })
  @IsUrl()
  @IsOptional()
  github?: string;

  @ApiPropertyOptional({ example: "https://myportfolio.com", required: false })
  @IsUrl()
  @IsOptional()
  website?: string;
}
