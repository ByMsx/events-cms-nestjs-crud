import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { GetRequestUser } from '../common/get-request-user.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: SignInResponseDto, status: 'default' })
  @Post('sign-in')
  async signIn(@GetRequestUser() user: User): Promise<SignInResponseDto> {
    return this.auth.login(user);
  }

  @ApiBody({ type: SignUpDto })
  @ApiResponse({ type: SignUpResponseDto, status: 201 })
  @HttpCode(201)
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.auth.signUp(body);
    return plainToInstance(SignUpResponseDto, user);
  }
}
