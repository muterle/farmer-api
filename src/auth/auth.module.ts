import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { JwtStrategyRefreshService } from './jwt-strategy/jwt-strategy-refresh.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../shared/constants';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategyService,
    JwtStrategyRefreshService,
  ],
  exports: [JwtModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
