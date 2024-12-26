import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards,Request, Patch, Param } from "@nestjs/common";
import { UserLoginDTO } from "src/User/dto/User.dto";
import { AuthencticationService } from "./authentication.service";
import { AuthGuard } from "src/utils/guards/auth.guard";
import { Public } from "src/utils/decorators/auth.decorator";


@Controller('auth')
export class AuthController{

    constructor(private readonly authService:AuthencticationService){}

    @Public()
    @Post('/login')
    async login(@Body() loginDTO:UserLoginDTO){
        const user = await this.authService.loginValidator(loginDTO);

        if(!user)
         {
         throw new HttpException('invalid Credentials',HttpStatus.UNAUTHORIZED)
         }

        return {
         message : "login Successful",
         user
        }    
    }

    @UseGuards(AuthGuard)
    @Patch('logout/:id')
    async logout(@Param('id') id:string){
        return this.authService.logout(id);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
    return req.user;
    }

}