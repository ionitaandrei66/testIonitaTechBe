import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtService],
  providers: [AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
