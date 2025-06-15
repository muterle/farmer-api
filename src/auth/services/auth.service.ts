import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: '12h',
    });
  }

  async generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: '13h',
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByDocumentNumber(username);

    if (user && user.isActive) {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
    }

    return null;
  }

  async login(userData: any, isRefresh: boolean = false) {
    const user = isRefresh
      ? await this.usersService.findByDocumentNumber(userData.email)
      : userData;

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.name,
      sub: user.id,
      email: user.email,
      documentNumber: user.documentNumber,
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      user: { name: user.name, email: user.email, id: user.id },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
