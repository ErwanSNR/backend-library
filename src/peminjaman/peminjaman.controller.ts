import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('peminjaman') // ← nama grup di Swagger UI
@ApiBearerAuth()     // ← endpoint ini butuh JWT token
@Controller('peminjaman')
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('peminjaman')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PeminjamanController {
  constructor(private readonly service: PeminjamanService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  create(@Body() dto: CreatePeminjamanDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findAll(@Query('date') date?: string) {
    return this.service.findAll(date);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/return')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  return(@Param('id', ParseIntPipe) id: number) {
    return this.service.returnBook(id);
  }
}