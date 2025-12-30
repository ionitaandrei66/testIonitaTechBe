import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { UserAuthInterface } from '../models/user-auth.interface';
import { Response } from 'express';
import { UserAuthDTO } from '../models/user-auth-d-t.o';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: UserAuthInterface) {
    const userExists = await this.validateUser(user.email, user.password);
    if (userExists) {
      const payload = { email: user.email };

      return {
        access_token: this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
        }),
        email: user.email,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async handleLogin(
    req: UserAuthDTO,
    res: Response,
  ): Promise<{ status: string; message: string }> {
    const body = await this.login(req);
    res.cookie('access_token', body.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 100000,
    });
    return {
      status: 'success',
      message: 'Account created and user logged in successfully',
    };
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<boolean> {
    return (
      email === 'test@20202020020asfas@$23523fsa2' &&
      password === 'a43543asfgt3qwer!4'
    );
  }
}
