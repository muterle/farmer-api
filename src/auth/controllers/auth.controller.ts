import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshGuard } from '../jwt-strategy/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req: any) {
    return await this.authService.login(req.user, true);
  }
}
