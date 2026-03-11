import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({ data: dto });
  }

  async findAll(filter: { name?: string; nis?: string }) {
    const { name, nis } = filter;

    return this.prisma.student.findMany({
      where: {
        AND: [
          name
            ? {
              name: {
                contains: name,
                //mode: 'insensitive', // tidak case sensitive
              },
            }
            : {},
          nis
            ? {
              nis: {
                contains: nis,
              },
            }
            : {},
        ],
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.student.delete({ where: { id } });
  }
}
