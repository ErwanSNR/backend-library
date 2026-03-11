import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [BookController],
  providers: [BooksService],
})
export class BookModule {}
