import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BookModule } from './book/book.module';
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [PrismaModule, StudentsModule, BookModule, PeminjamanModule, AuthModule,ConfigModule.forRoot({ isGlobal: true })],


  controllers: [AppController],
  providers: [AppService],
    
})
export class AppModule {}

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env', // ← tambah ini
})