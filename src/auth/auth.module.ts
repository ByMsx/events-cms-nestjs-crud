import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSettings } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtSettings.secret,
      signOptions: { expiresIn: '10000s' },
    }),
    PassportModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    AuthService,
  ],
  exports: [JwtAuthGuard, LocalAuthGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
