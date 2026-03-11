import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePeminjamanDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  studentId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  bookId: number;
}