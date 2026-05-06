import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('peminjaman')
@ApiBearerAuth()
@Controller('peminjaman')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PeminjamanController {
  constructor(private readonly service: PeminjamanService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @ApiOperation({ summary: 'Buat peminjaman baru' })
  create(@Body() dto: CreatePeminjamanDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @ApiOperation({ summary: 'Ambil semua peminjaman' })
  @ApiQuery({ name: 'date', required: false, description: 'Filter by date (YYYY-MM-DD)' })
  findAll(@Query('date') date?: string) {
    return this.service.findAll(date);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @ApiOperation({ summary: 'Ambil peminjaman by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/return')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @ApiOperation({ summary: 'Kembalikan buku' })
  returnBook(@Param('id', ParseIntPipe) id: number) {
    return this.service.returnBook(id);
  }
}