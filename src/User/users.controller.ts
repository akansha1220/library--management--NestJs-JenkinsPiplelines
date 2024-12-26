import { Body, Controller, Delete, Get,  Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/User.dto";
import { UsersService } from "./users.service";
import { Roles } from "src/utils/decorators/role.decorators";
import { Role } from "src/auth/enum/role.enum";
import { Public } from "src/utils/decorators/auth.decorator";


@Controller('users')
export class UsersController{

    constructor(private usersService: UsersService){}

    @Public()
    @Post('/signup')
    async createNewUser(@Body() values:CreateUserDTO){
         return this.usersService.signup(values);
    }

    @Get(':id')
    @Roles(Role.TEACHER)
    findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
    }

   @Get()
   @Roles(Role.TEACHER)
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