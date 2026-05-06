import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PeminjamanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePeminjamanDto): Promise<{
        student: {
            id: number;
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
        };
        book: {
            id: number;
            title: string;
            author: string;
            year: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        studentId: number;
        bookId: number;
        borrowedAt: Date;
        returnedAt: Date | null;
    }>;
    findAll(date?: string): Promise<({
        student: {
            id: number;
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
        };
        book: {
            id: number;
            title: string;
            author: string;
            year: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        studentId: number;
        bookId: number;
        borrowedAt: Date;
        returnedAt: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        student: {
            id: number;
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
        };
        book: {
            id: number;
            title: string;
            author: string;
            year: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        studentId: number;
        bookId: number;
        borrowedAt: Date;
        returnedAt: Date | null;
    }>;
    returnBook(id: number): Promise<{
        student: {
            id: number;
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
        };
        book: {
            id: number;
            title: string;
            author: string;
            year: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        studentId: number;
        bookId: number;
        borrowedAt: Date;
        returnedAt: Date | null;
    }>;
}
