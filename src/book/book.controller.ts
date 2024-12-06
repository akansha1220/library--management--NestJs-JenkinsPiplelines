import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { BookIssueDTO, BookReturnDTO, CreateBookDto, } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.addbook(createBookDto);
  }

  @Get('history')
  findAll() {
    return this.bookService.getAllBookHistories();
  }

  @Get(':name')
  getHistoryByBookId(@Param('name') name: string) {
    return this.bookService.getHistoryByBookName(name);
  }

  @Post(':id')
  issueBook(@Param('id') id:number,@Body() bookIssue:BookIssueDTO){
    return this.bookService.issueBook(id,bookIssue)
  }

  @Patch(':id')
  returnBook(@Body() BookReturnDTO:BookReturnDTO){
    return this.bookService.returnBook(BookReturnDTO)
  }

  @Delete(':name')
  deleteBook(@Param('name') name:string ){
    return this.bookService.deletebookByname(name)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }

  @Get()
  getallBooks(){
    return this.bookService.getAllBooks()
  }
  
}
