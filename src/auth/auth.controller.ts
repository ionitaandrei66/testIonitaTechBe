import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Response } from 'express';
import { UserAuthDTO } from './models/user-auth-d-t.o';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() req: UserAuthDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.handleLogin(req, res);
  }
}
