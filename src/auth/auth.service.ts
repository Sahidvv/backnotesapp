import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly USER = 'admin';
  private readonly PASSWORD = '1234';

  login(username: string, password: string) {
    if (username === this.USER && password === this.PASSWORD) {
      return { token: 'fake-jwt-token' };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
