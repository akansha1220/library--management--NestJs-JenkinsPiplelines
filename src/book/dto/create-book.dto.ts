import { IsDate, IsEnum, IsIn,  IsInt,  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Book } from "../entities/book.entity";
import { Type } from "class-transformer";

enum Status{
    ISSUED='issued',
    AVAILABLE = 'available'
}
export class CreateBookDto {

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    author:string;
    
}


export class BookHistoryDto {

    
  @IsString()
  @IsNotEmpty()
  title: string; // Assuming you want to get book name for the input

  @IsDate()
  @IsNotEmpty()
  issuedDate: Date;

  @IsDate()
  returnedDate: Date;

  
  @IsNotEmpty()
  issuedTo: number;

  
  @IsNotEmpty()
  issuedBy: number;

  @IsIn(Object.keys(Status))
  status: Status;
    
}

export class BookIssueDTO{
    @IsString()
    @IsNotEmpty()
    title: string; // Book title or name
  
    @IsDate()
    @Type(() => Date) 
    @IsNotEmpty()
    issuedDate: Date;
  

    @IsNotEmpty()
    issueTo: number; // User to whom the book is issued
  

    status:'issued';

    @IsOptional()
    returnedate?: Date|null;
}

export class BookReturnDTO{

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsDate()
    @Type(() => Date) 
    @IsNotEmpty()
    returnedDate:Date;

    @IsInt()
    @IsNotEmpty()
    issueTo: number; 
}


