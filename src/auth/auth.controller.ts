import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GetRequestUser } from '../get-request-user.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: SignInResponseDto, status: 'default' })
  @Post('sign-in')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn(@GetRequestUser() user, @Body(new ValidationPipe()) body: SignInDto) {
    return this.auth.login(user);
  }
}
