import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('books') // ← nama grup di Swagger UI
@ApiBearerAuth()     // ← endpoint ini butuh JWT token
@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BooksService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get() // ← pindah ke @Get() dengan @Query, bukan @Get(':title')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS, UserRole.MEMBER)
  findAll(@Query('title') title?: string) {
    return this.bookService.findAll(title);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS, UserRole.MEMBER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}