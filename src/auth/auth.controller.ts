import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Post, Req,
  Res, UnauthorizedException
} from "@nestjs/common";
import { AuthService } from './services/auth.service';
import { Response } from 'express';
import { UserAuthDTO } from './models/user-auth-d-t.o';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  public decodeJWT(codedJWT: string): string | { [key: string]: any } {
    const jwt = codedJWT.replace('Bearer ', '');
    return this.jwtService.decode(jwt);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() req: UserAuthDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.handleLogin(req, res);
  }

  @Get('check')
  checkAuth(@Req() req: any) {
    const token = req.cookies?.['access_token'];
    if (!token) throw new UnauthorizedException('No token');

    try {
      const decoded = this.decodeJWT(token);
      if (decoded) return { authenticated: true };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
