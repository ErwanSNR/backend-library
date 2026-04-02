"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeminjamanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let PeminjamanService = class PeminjamanService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existingLoan = await this.prisma.peminjaman.findFirst({
            where: {
                bookId: dto.bookId,
                returnedAt: null,
            },
        });
        if (existingLoan) {
            throw new common_2.BadRequestException('Buku sedang dipinjam dan belum dikembalikan');
        }
        return this.prisma.peminjaman.create({
            data: {
                studentId: dto.studentId,
                bookId: dto.bookId,
            },
        });
    }
    async findAll(date) {
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
    async findOne(id) {
        return this.prisma.peminjaman.findUnique({
            where: { id },
            include: {
                student: true,
                book: true,
            },
        });
    }
    async returnBook(id) {
        return this.prisma.peminjaman.update({
            where: { id },
            data: { returnedAt: new Date() },
        });
    }
};
exports.PeminjamanService = PeminjamanService;
exports.PeminjamanService = PeminjamanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeminjamanService);
//# sourceMappingURL=peminjaman.service.js.map