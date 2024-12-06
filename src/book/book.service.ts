import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BookIssueDTO, BookReturnDTO, CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookHistory } from './entities/bookhistory.entity';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(BookHistory) private readonly bookHistoryRepo : Repository<BookHistory>,
    @InjectRepository(Book) private readonly bookRepo : Repository<Book>
    ){}


  async addbook(createBookDto: CreateBookDto):Promise<Book> {
    
    const newbook = this.bookRepo.create(createBookDto);

    return await this.bookRepo.save(newbook);  
  }


  async getHistoryByBookName(bookname: string): Promise<BookHistory[]> {
    return this.bookHistoryRepo.find({
      where: { book: { title: bookname } },
      relations: ['book'], // Include the associated book data
    });
  }

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

  async issueBook(id:number,bookIssueDTO: BookIssueDTO): Promise<BookHistory> {
    const title=bookIssueDTO.title

    const book = await this.bookRepo.findOne({ where: { title } });
  
    if (!book) {
      throw new BadRequestException('This book not found');
    }
  
    // Check if the book is already issued
    const existingHistory = await this.bookHistoryRepo.findOne(
      {  where: {
        title: title,
        status: 'issued',
      }, });
  
    if (existingHistory) {
      throw new BadRequestException('This book is not available');
    }
  
    // Create a new BookHistory record
    const newHistory = this.bookHistoryRepo.create({
      title,
      issuedDate:bookIssueDTO.issuedDate,
      issueTo:bookIssueDTO.issueTo,
      returnedDate:null,
      status:'issued',
      issueBy:id
    });
  
    return await this.bookHistoryRepo.save(newHistory);
  }


  async returnBook(bookReturn: BookReturnDTO): Promise<BookHistory> {
    const { title, returnedDate,issueTo} = bookReturn;
  
    const existingHistory = await this.bookHistoryRepo.findOne({
      where: {
        title: title ,
        status: 'issued',
        issueTo:issueTo,   
      } 
    });
  
    if (!existingHistory) {
      throw new UnauthorizedException('No active issue record found for this book');
    }
  
    existingHistory.status = 'available';  // Update status to available
    existingHistory.returnedDate = returnedDate;  // Set the returned date

    const updatedReturnedBookHistory = this.bookHistoryRepo.merge(
      existingHistory,
    );
  
    return this.bookHistoryRepo.save(updatedReturnedBookHistory);
  }
}
