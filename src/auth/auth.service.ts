import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private users: UsersRepository,
    private jwtService: JwtService,
  ) {}

  validate(email: string, password: string): Promise<User> {
    return this.users.findUserByEmailAndPassword(email, password);
  }

  createToken(user: User): string {
    return this.jwtService.sign({ id: user.id });
  }
}
