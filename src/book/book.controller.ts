import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookIssueDTO, BookReturnDTO, CreateBookDto, } from './dto/create-book.dto';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/utils/decorators/role.decorators';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @HttpCode(HttpStatus.OK)
  @Post('add')
  @Roles(Role.TEACHER)
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.addbook(createBookDto);
  }

  @Get('history')
  @Roles(Role.TEACHER)
  findAll() {
    return this.bookService.getAllBookHistories();
  }

  @Get(':name')
  @Roles(Role.TEACHER)
  getHistoryByBookId(@Param('name') name: string) {
    //return this.bookService.getHistoryByBookName(name);
  }

  @Post(':id')
  @Roles(Role.TEACHER)
  issueBook(@Param('id') id:string,@Body() bookIssue:BookIssueDTO){
    return this.bookService.issueBook(id,bookIssue)
  }

  @Patch(':id')
  @Roles(Role.TEACHER)
  returnBook(@Body() BookReturnDTO:BookReturnDTO){
    return this.bookService.returnBook(BookReturnDTO)
  }

  @Delete(':name')
  @Roles(Role.TEACHER)
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
