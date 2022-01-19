import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
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
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: SignInResponseDto, status: 'default' })
  @Post('sign-in')
  async signIn(@GetRequestUser() user: User): Promise<SignInResponseDto> {
    const token = this.auth.createToken(user);
    return {
      token,
      user: plainToInstance(UserDto, user),
    };
  }

  @ApiBody({ type: SignUpDto })
  @ApiResponse({ type: SignUpResponseDto, status: 201 })
  @HttpCode(201)
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.users.signUp(body);
    return plainToInstance(SignUpResponseDto, user);
  }
}
