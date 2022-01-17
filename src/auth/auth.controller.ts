import {
  Body,
  Controller,
  HttpCode,
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
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { plainToInstance } from 'class-transformer';

//REVIEW: Это лучше перенести в users module.
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: SignInResponseDto, status: 'default' })
  @Post('sign-in')
  //REVIEW: типизировать user нодо.
  //REVIEW: body можно убрать тогда.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn(@GetRequestUser() user, @Body(new ValidationPipe()) body: SignInDto) {
    return this.auth.login(user);
  }

  @ApiBody({ type: SignUpDto })
  @ApiResponse({ type: SignUpResponseDto, status: 201 })
  @HttpCode(201)
  @Post('sign-up')
  async signUp(
    //REVIEW: сейчас у тебя не отрабатывает Validator. Лучше его глобально подключить.
    @Body(new ValidationPipe()) body: SignUpDto,
  ): Promise<SignUpResponseDto> {
    const user = await this.auth.signUp(body);
    return plainToInstance(SignUpResponseDto, user);
  }
}
