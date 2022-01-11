import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  validate(email: string, password: string): Promise<User> {
    return this.users.findUserByEmailAndPassword(email, password);
  }

  async login(user: any) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}