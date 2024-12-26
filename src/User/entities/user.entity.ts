import { IsEmail } from 'class-validator';
import { Authentication } from 'src/auth/entities/authentication.entity';
import { BookHistory } from 'src/book/entities/bookhistory.entity';
import { Session } from 'src/session/entities/session.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn  } from 'typeorm' ;



@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({name:'name',type:"varchar",length: 128,nullable:false})
    name: string;

    @Column({unique:true})
    @IsEmail()
    email : string;

    @Column({type:"varchar",name:"address"})
    address: string;

    @Column({type:'varchar',width:13})
    phone: string;

    @CreateDateColumn({name:"createdAt",})
    createdAt:Date

    @UpdateDateColumn({name:"updatedAt"})
    updatedAt:Date

    @DeleteDateColumn({name:"deletedAt"})
    deletedAt:Date

    @Column({type:'uuid',name:"auth_id"})
    authId:string;

    @OneToMany(() => BookHistory, (history) => history.issueTo)
    issuedBooks: BookHistory[];
  
    @OneToMany(() => BookHistory, (history) => history.issueBy)
    issuedBy: BookHistory[];

    @OneToOne(()=> Authentication,(Authentication)=>Authentication.id)
    auth:Authentication ;

    @OneToMany(() => Session, (session) => session.userId)
    session:Session;
    
}