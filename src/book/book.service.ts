import { BadRequestException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { BookIssueDTO, BookReturnDTO, CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookHistory } from './entities/bookhistory.entity';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { BookStatusEnum } from './enums/bookstatus.enum';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(BookHistory) private readonly bookHistoryRepo : Repository<BookHistory>,
    @InjectRepository(Book) private readonly bookRepo : Repository<Book>
    ){}


  async addbook(createBookDto: CreateBookDto):Promise<Book> {
    const book = await this.bookRepo.findOneBy({isbno:createBookDto.isbno})
    
    if(book){
      throw new UnauthorizedException("this book is already present")
    }
    const newbook = this.bookRepo.create(createBookDto);

    return await this.bookRepo.save(newbook);  
  }


  // async getHistoryByBookName(bookid: string): Promise<BookHistory[]> {
  //   return this.bookHistoryRepo.find({
  //     where: {:  bookid  },
  //     relations: ['book'], // Include the associated book data
  //   });
  // }

  async getAllBookHistories(): Promise<BookHistory[]> {
    return await this.bookHistoryRepo.find() // If you want to include related data (like book details)
    
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepo.find() // If you want to include related data (like book details)
    
  }

  async deletebookByname(title:string):Promise<any|null>{

    const book = await this.bookRepo.findOneBy({title});
      if (!book) {
        throw new UnauthorizedException('This book is not existed');
      }
        
    await this.bookRepo.delete(book);  

    return {message:"Book deleted successfully"}
  }

  async issueBook(issue_by:string,bookIssueDTO: BookIssueDTO): Promise<BookHistory> {
    const isbno=bookIssueDTO.isbno

    const book = await this.bookRepo.findOne({ where: { isbno } });
  
    if (!book) {
      throw new BadRequestException('This book not found');
    }
    // Check if the book is already issued
    const checkStatus = await this.bookRepo.findOne(
      {  where: {
        isbno:book.isbno,
        status: BookStatusEnum.AVAILABLE
      }, });
  
    if (!checkStatus) {
      throw new BadRequestException('This book is not available');
    }

    // Create a new BookHistory record
    const newHistory = this.bookHistoryRepo.create({
      isbno:book.isbno,
      issueTo:bookIssueDTO.issueTo,
      issueBy:issue_by,
    });
    await this.bookHistoryRepo.save(newHistory)

    checkStatus.status=BookStatusEnum.ISSUED
    const updateBookStatus = await this.bookRepo.merge(checkStatus);
    await this.bookRepo.save(updateBookStatus)
    
    return newHistory;
  }


  async returnBook(bookReturn: BookReturnDTO): Promise<BookHistory> {
    const { isbno,issueTo} = bookReturn;
  
    const existingHistory = await this.bookHistoryRepo.findOne({
      where: {
        isbno: isbno ,
        issueTo:issueTo,
        returnedDate:null,   
      } 
    });
  
    if (!existingHistory) {
      throw new UnauthorizedException('No active issue record found for this book');
    }
    
    existingHistory.returnedDate = new Date();  // Set the returned date

    const updatedReturnedBookHistory = this.bookHistoryRepo.merge(
      existingHistory,
    );

    const book = await this.bookRepo.findOne({ where: { isbno } })
    book.status=BookStatusEnum.AVAILABLE
    const updateBookStatus = await this.bookRepo.merge(book);
    await this.bookRepo.save(updateBookStatus)
  
    return this.bookHistoryRepo.save(updatedReturnedBookHistory);
  }
}
