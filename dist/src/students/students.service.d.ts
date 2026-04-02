import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStudentDto): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(filter: {
        name?: string;
        nis?: string;
    }): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateStudentDto): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
