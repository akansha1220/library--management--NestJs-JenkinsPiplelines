import { IsDate, IsString } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity('Authenctication')
export class Authentication {
    @Column({name:"username",type:"varchar",length:64,nullable:false})
    userName:string;

    @Column({name:"passoword",type:"varchar",length:255,nullable:false})
    password:string;

    @Column({name:"last_password",type:"varchar",array:true,nullable:true})
    lastPassword:string[];

    @CreateDateColumn({name:"created_at"})
    createdAt:Date;

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date;

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date;

}