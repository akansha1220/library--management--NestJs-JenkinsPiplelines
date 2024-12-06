import { IsEmail, IsNotEmpty, MinLength,IsEnum } from 'class-validator';
import { Role } from '../entities/user.entity';


export class userloginDTO{

    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @MinLength(8)
    @IsNotEmpty()
    password : string;
}

export class CreateUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
    
    @IsNotEmpty()
    @MinLength(8)
    password : string;

    @IsNotEmpty()
    name: string;

    @IsEnum(Role, { message: 'Role must be either student or teacher' })
    role: Role;

}