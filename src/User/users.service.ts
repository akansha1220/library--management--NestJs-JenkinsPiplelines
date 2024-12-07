import {  Injectable,UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { CreateUserDTO } from "./dto/User.dto";

@Injectable()

export class UsersService{

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){}
    
    async loginValidator(email:string,password:string) : Promise <any|null>{
        const user = await this.userRepository.findOneBy({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');}
        return { message: 'Login successful' };
    }

    async createUserValidator(newUser:CreateUserDTO) : Promise <User>{
        const {email,password,name,role}=newUser
        const user = await this.userRepository.findOneBy({email});
        if (user) {
            throw new UnauthorizedException('This email is already in use');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await this.userRepository.create({
            email,
            name,
            password:hashedPassword,
            role
        });

        return await this.userRepository.save(newuser);
    }

    update(arg0: number, updateLibrarianDto: CreateUserDTO) {
        throw new Error("Method not implemented.");
    }

    async findOne(id: number):Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new UnauthorizedException('This email is already in use');
        }    
        return user;
    }

    async GetAllUsers():Promise<User[]>{
        return this.userRepository.find()
    }

    async deleteuser(name: string):Promise<any> {
        const user = await this.userRepository.findOne({ where: { name} });
        if (!user) {
            throw new UnauthorizedException('This user is not exist');
        }    
        this.userRepository.delete(user);

        return {message :"User Deleted successfully"}
    }
    
}