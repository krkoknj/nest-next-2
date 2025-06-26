import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export interface TokenPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user, response: Response) {
    console.log('Logging in user:', user);
    const tokenPayload: TokenPayload = {
      id: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      expires: new Date(),
    });
  }
}
