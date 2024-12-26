import { IsEmail, IsNotEmpty, MinLength,IsEnum, IsString,  IsPhoneNumber } from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';


export class UserLoginDTO{

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

    @IsNotEmpty()
    @IsString()
    address:string;

    
    @IsPhoneNumber('IN')
    phone:string;

}


