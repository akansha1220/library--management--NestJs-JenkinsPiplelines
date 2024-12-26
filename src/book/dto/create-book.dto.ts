import { IsDate, IsEmpty, IsEnum, IsIn,  IsInt,  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Optional } from "@nestjs/common";


export class CreateBookDto {

    @IsNotEmpty()
    title:string;

    
    @IsNotEmpty()
    author:string;

    @IsNotEmpty()
    isbno:string;
    
}


export class BookHistoryDto {

    
  @IsString()
  @IsNotEmpty()
  bookid: string; // Assuming you want to get book name for the input

  @IsDate()
  @IsNotEmpty()
  issuedDate: Date;

  @IsDate()
  returnedDate: Date;

  
  @IsNotEmpty()
  issuedTo: string;

  
  @IsNotEmpty()
  issuedBy: string;

    
}

export class BookIssueDTO{
  
    @IsNotEmpty()
    @IsString()
    isbno:string;

    @IsNotEmpty()
    @IsString()
    issueTo:string;

}

export class BookReturnDTO{

    @IsString()
    @IsNotEmpty()
    isbno:string;


    @IsString()
    @IsNotEmpty()
    issueTo: string; 
}


