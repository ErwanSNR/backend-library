import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('students') // ← nama grup di Swagger UI
@ApiBearerAuth()     // ← endpoint ini butuh JWT token
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findAll(@Query('name') name?: string, @Query('nis') nis?: string) {
    return this.studentsService.findAll({ name, nis });
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS, UserRole.MEMBER)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(Number(id));
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}