import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
export declare class PeminjamanController {
    private readonly service;
    constructor(service: PeminjamanService);
    create(dto: CreatePeminjamanDto): Promise<{
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
    findOne(id: number): Promise<({
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
    }) | null>;
    return(id: number): Promise<{
        id: number;
        studentId: number;
        bookId: number;
        borrowedAt: Date;
        returnedAt: Date | null;
    }>;
}
