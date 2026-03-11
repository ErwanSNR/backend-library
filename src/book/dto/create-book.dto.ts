import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Pemrograman NestJS' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  author: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  year: number;
}