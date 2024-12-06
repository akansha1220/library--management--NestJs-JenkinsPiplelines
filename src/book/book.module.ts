import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { BookHistory } from './entities/bookhistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Book,BookHistory]) ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
