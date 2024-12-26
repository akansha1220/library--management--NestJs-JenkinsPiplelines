import { Column, CreateDateColumn, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('history')
export class BookHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({name:"issue_date"})
  issuedDate: Date;

  @Column({ type: 'timestamp', name:"return_date",nullable: true })
  returnedDate: Date;

  @Column({ type: 'varchar',name:'book_id' })
  isbno: string;

  @Column({ type: 'uuid',name:'issue_to' })
  issueTo: string;

  @Column({ type: 'uuid',name:'issue_by' })
  issueBy: string;
}
