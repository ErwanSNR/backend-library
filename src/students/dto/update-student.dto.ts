import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiPropertyOptional({ example: '12345' })
  @IsString()
  @IsOptional()
  nis?: string;

  @ApiPropertyOptional({ example: 'Budi Santoso' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'budi@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'X RPL 1' })
  @IsString()
  @IsOptional()
  kelas?: string;

  @ApiPropertyOptional({ example: 'Rekayasa Perangkat Lunak' })
  @IsString()
  @IsOptional()
  jurusan?: string;
}