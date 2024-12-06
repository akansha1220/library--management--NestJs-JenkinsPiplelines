import { BookHistory } from 'src/book/entities/bookhistory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from 'typeorm' ;

export enum Role {
    STUDENT = 'student',
    TEACHER = 'teacher',
  }

@Entity('users')
export class User {

    @PrimaryGeneratedColumn( ) 
    id: number;

    @Column({type:"varchar",length: 128,nullable:false})
    name: string;

    @Column({unique:true})
    email : string;

    @Column()
    password:string;


    @Column({ type: 'enum', enum: ['student', 'teacher'] }) // Enum for role
    role: 'student' | 'teacher';

    @OneToMany(() => BookHistory, (history) => history.issueTo)
    issuedBooks: BookHistory[];
  
    @OneToMany(() => BookHistory, (history) => history.issueBy)
    issuedBy: BookHistory[];

}