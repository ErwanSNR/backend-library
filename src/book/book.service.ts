import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  async findAll(title?: string) {
    return this.prisma.book.findMany({
      where: title 
        ? { title: { contains: title} } // ← case-insensitive search
        : undefined,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`); // ← pesan lebih informatif
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id); // ← cek existensi dulu
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id); // ← cek existensi dulu
    await this.prisma.book.delete({ where: { id } });
    return { message: `Book with id ${id} successfully deleted` }; // ← pesan lebih jelas
  }
}