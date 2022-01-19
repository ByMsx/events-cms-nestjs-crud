import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';

//REVIEW: то, что связано с auth должно быть в auth модуле. Например validate, createToken, verifyToken, AuthGuards.
// а метод login должен быть в usersModule и он может вызывать, например, createToken из auth.
@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  validate(email: string, password: string): Promise<User> {
    return this.users.findUserByEmailAndPassword(email, password);
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({ id: user.id }),
      user: plainToInstance(UserDto, user),
    };
  }

  signUp(body: SignUpDto) {
    return this.users.signUp(body);
  }
}
