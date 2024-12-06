import { User } from "src/User/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";


@Entity()
export class BookHistory {
  @PrimaryGeneratedColumn()
  hist_id: number;

  @Column({ type: 'date' })
  issuedDate: Date;

  @Column({ type: 'date', nullable: true })
  returnedDate: Date;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  issueTo: number;

  @Column({ type: 'varchar' })
  issueBy: number;

  @Column({ type: 'varchar' })
  status: string;;

  @ManyToOne(() => Book, (book) => book.history)
  @JoinColumn({ name: 'title', referencedColumnName: 'title' })
  book: Book;

  @ManyToOne(() => User, (user) => user.issuedBooks)
  @JoinColumn({ name: 'issueTo', referencedColumnName: 'id' })
  IssuedTo: User;

  @ManyToOne(() => User, (user) => user.issuedBy)
  @JoinColumn({ name: 'issueBy', referencedColumnName: 'id' })
  IssuedBy: User;
}
