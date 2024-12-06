import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { BookIssueDTO, BookReturnDTO, CreateBookDto, } from './dto/create-book.dto';

@Controller('/bookhistory')
export class BookHistoryController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAllbookHistory() {
    return this.bookService.getAllBookHistories();
  }

  @Get(':name')
  getHistoryByBookId(@Param('name') name: string) {
    return this.bookService.getHistoryByBookName(name);
  }

  // @Post('/issue')
  // issueBook(@Param() bookIssue:BookIssueDTO){
  //   return this.bookService.Issuebook(bookIssue)
  // }

  @Post('/return')
  returnBook(@Param() BookReturnDTO:BookReturnDTO){
    return this.bookService.returnBook(BookReturnDTO)
  }

  

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }

  
}
