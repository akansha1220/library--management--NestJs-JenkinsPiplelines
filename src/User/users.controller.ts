import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { userloginDTO,CreateUserDTO } from "./dto/User.dto";
import { UsersService } from "./users.service";


@Controller('/users')
export class UsersController{

    constructor(private usersService: UsersService){}

    @Post('/login')
    async getlogincred(@Body() values:userloginDTO){
       const user = await this.usersService.loginValidator(values.email,values.password);

       if(!user)
        {
        throw new HttpException('invalid Credentials',HttpStatus.UNAUTHORIZED)
        }

       return {
        message : "login Successful"
       }
    }


    @Post('/newuser')
    async createNewUser(@Body() values:CreateUserDTO){
        return this.usersService.createUserValidator(values);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
    }

   @Get()
   findAllUser() {
   return this.usersService.GetAllUsers();
   }
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateLibrarianDto: CreateUserDTO) {
    // return this.usersService.update(+id, updateLibrarianDto);
    // }

    @Delete(':name')
    DeleteUser(@Param('name') name:string){
        return this.usersService.deleteuser(name)
    }

}