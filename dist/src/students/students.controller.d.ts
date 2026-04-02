import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
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
    findAll(name?: string, nis?: string): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateStudentDto): Promise<{
        id: number;
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
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
