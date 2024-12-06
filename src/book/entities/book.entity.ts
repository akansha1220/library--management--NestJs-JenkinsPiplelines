import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookHistory } from "./bookhistory.entity";


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column({unique:true})
  title: string;

  @Column()
  author: string;

  @OneToMany(() => BookHistory, (history) => history.book)
  history: BookHistory[];
}

    

  



