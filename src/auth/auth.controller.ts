import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GetRequestUser } from '../get-request-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@GetRequestUser() user) {
    return this.auth.login(user);
  }
}
