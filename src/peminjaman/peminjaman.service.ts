import { Injectable } from '@nestjs/common';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreatePeminjamanDto) {
    
     // 1️⃣ Cek apakah buku sedang dipinjam
  const existingLoan = await this.prisma.peminjaman.findFirst({
    where: {
      bookId: dto.bookId,
      returnedAt: null,
    },
  });

  if (existingLoan) {
   throw new BadRequestException(
    'Buku sedang dipinjam dan belum dikembalikan',
  );
  }

  // 2️⃣ Kalau aman, buat peminjaman
  return this.prisma.peminjaman.create({
    data: {
      studentId: dto.studentId,
      bookId: dto.bookId,
    },
  });
  }

  async findAll(date?: string) {
    return this.prisma.peminjaman.findMany({
      where: date
        ? {
          borrowedAt: {
            gte: new Date(date + 'T00:00:00.000Z'),
            lt: new Date(date + 'T23:59:59.999Z'),
          },
        }
        : undefined,
      include: {
        student: true,
        book: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.peminjaman.findUnique({
      where: { id },
      include: {
        student: true,
        book: true,
      },
    });
  }

  async returnBook(id: number) {
    return this.prisma.peminjaman.update({
      where: { id },
      data: { returnedAt: new Date() },
    });
  }
}


