import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookHistory } from "./bookhistory.entity";
import { BookStatusEnum } from "../enums/bookstatus.enum";


@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:'title',type:'varchar'})
  title: string;

  @Column({name:'author',type:'varchar'})
  author: string;

  @Column({unique:true,name:'isbno',type :"varchar"})
  isbno:string;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;

  @DeleteDateColumn()
  deletedAt:Date;

  @Column({ type: 'enum', enum:BookStatusEnum,default:BookStatusEnum.AVAILABLE})
  status:BookStatusEnum;

  @OneToMany(() => BookHistory, (history) => history.isbno)
  history: BookHistory[];
}

    

  



