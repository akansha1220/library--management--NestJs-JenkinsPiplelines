import {  Injectable,UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { CreateUserDTO } from "./dto/User.dto";
import { Authentication } from "src/auth/entities/authentication.entity";
import {hashPassword} from 'src/utils/common.utils'

@Injectable()

export class UsersService{
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        @InjectRepository(Authentication) 
        private readonly authRepository: Repository<Authentication>
    ){}

    async findUserByEmail(email:string): Promise<User> {
		const user = await this.userRepository.findOneBy({email});
		return user;
	}

    async signup(newUser:CreateUserDTO) : Promise <User>{
        const {email,password,name,role,address,phone}=newUser;
                   
        const hashedPassword = await hashPassword(password)
        const newauth = await this.authRepository.create({
            password:hashedPassword,
            username:email,
            role:role,
            lastPassword:[hashedPassword],
        })
        
        const auth = await this.authRepository.save(newauth);
        const newuser =  this.userRepository.create({
            email,
            name,
            address,
            phone,
            authId:auth.id,
        });
        return await this.userRepository.save(newuser);
    }

    update(arg0: number, updateLibrarianDto: CreateUserDTO) {
        throw new Error("Method not implemented.");
    }

    async findOne(email: string):Promise<User> {
        const user = await this.userRepository.findOne({ where: { email} });
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