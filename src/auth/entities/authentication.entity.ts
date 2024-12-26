import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/role.enum";

@Entity('authentication')
export class Authentication {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:"username",type:"varchar",length:64,nullable:false})
    username:string;

    @Column({name:"password",type:"varchar",length:255,nullable:false})
    password:string;

    @Column({name:"last_password",type:"varchar",array:true,nullable:true})
    lastPassword:string[];

    @Column({ type: 'enum', enum: Role}) // Enum for role
    role: Role;

    @CreateDateColumn({name:"created_at"})
    createdAt:Date;

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date;

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date;

}