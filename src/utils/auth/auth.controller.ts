import { IRequestWithUser } from '../common/http.interface';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IPayloadJwt } from './auth.interface';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/User/dto/User.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtRefreshTokenAuthGuard } from './guard/jwt-refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async register(@Body() registerDto: CreateUserDTO) {
    const user = await this.authService.register(registerDto);
    return user;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(@Req() req: IRequestWithUser) {
    const { user } = req;
    const payload: IPayloadJwt = {
      userId: user.id,
      email: user.email,
    };
    const accessTokenCookie = this.authService.getCookieWithToken(payload);
    const {
      cookie: refreshTokenCookie,
      token: refreshToken,
    } = this.authService.getCookieWithJwtRefreshToken(payload);
    await this.authService.setCurrentRefreshToken(user, refreshToken);
    this.authService.setHeaderArray(req.res, [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Get('refresh')
  public refreshToken(@Req() req: IRequestWithUser) {
    const { user } = req;
    const payload: IPayloadJwt = {
      userId: user.id,
      email: user.email,
    };
    const accessTokenCookie = this.authService.getCookieWithToken(payload);
    this.authService.setHeaderSingle(req.res, accessTokenCookie);
    return req.user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public getAuthenticatedUser(@Req() req: IRequestWithUser) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  public async logout(@Req() req: IRequestWithUser) {
    const { user } = req;
    await this.authService.removeRefreshToken(user);
    this.authService.clearCookie(req.res);
    return {
      logout: true,
    };
  }
}