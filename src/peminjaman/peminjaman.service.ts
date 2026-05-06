import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreatePeminjamanDto) {
    // Cek apakah student ada
    const student = await this.prisma.student.findUnique({
      where: { id: dto.studentId },
    });
    if (!student) throw new NotFoundException(`Student dengan id ${dto.studentId} tidak ditemukan`);

    // Cek apakah buku ada
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });
    if (!book) throw new NotFoundException(`Buku dengan id ${dto.bookId} tidak ditemukan`);

    // Cek apakah buku sedang dipinjam
    const existingLoan = await this.prisma.peminjaman.findFirst({
      where: { bookId: dto.bookId, returnedAt: null },
    });
    if (existingLoan) {
      throw new BadRequestException('Buku sedang dipinjam dan belum dikembalikan');
    }

    return this.prisma.peminjaman.create({
      data: {
        studentId: dto.studentId,
        bookId: dto.bookId,
      },
      include: { student: true, book: true }, // ← langsung return relasi
    });
  }

  async findAll(date?: string) {
    // Validasi format date
    if (date && isNaN(Date.parse(date))) {
      throw new BadRequestException('Format tanggal tidak valid, gunakan YYYY-MM-DD');
    }

    return this.prisma.peminjaman.findMany({
      where: date
        ? {
            borrowedAt: {
              gte: new Date(date + 'T00:00:00.000Z'),
              lt: new Date(date + 'T23:59:59.999Z'),
            },
          }
        : undefined,
      include: { student: true, book: true },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const peminjaman = await this.prisma.peminjaman.findUnique({
      where: { id },
      include: { student: true, book: true },
    });
    if (!peminjaman) throw new NotFoundException(`Peminjaman dengan id ${id} tidak ditemukan`);
    return peminjaman;
  }

  async returnBook(id: number) {
    // Cek apakah peminjaman ada
    const peminjaman = await this.findOne(id);

    // Cek apakah buku sudah dikembalikan
    if (peminjaman.returnedAt) {
      throw new BadRequestException('Buku sudah dikembalikan sebelumnya');
    }

    return this.prisma.peminjaman.update({
      where: { id },
      data: { returnedAt: new Date() },
      include: { student: true, book: true },
    });
  }
}