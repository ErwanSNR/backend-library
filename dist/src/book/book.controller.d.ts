import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BooksService);
    create(dto: CreateBookDto): Promise<{
        id: number;
        title: string;
        author: string;
        year: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(title?: string): Promise<{
        id: number;
        title: string;
        author: string;
        year: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        author: string;
        year: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateBookDto): Promise<{
        id: number;
        title: string;
        author: string;
        year: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
