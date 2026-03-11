import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: '12345' })
  @IsString()
  nis: string;

  @ApiProperty({ example: 'Budi Santoso' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'budi@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'X RPL 1' })
  @IsString()
  kelas: string;

  @ApiProperty({ example: 'Rekayasa Perangkat Lunak' })
  @IsString()
  jurusan: string;
}