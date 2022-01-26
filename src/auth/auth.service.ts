import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private users: UsersRepository,
  ) {}

  async validateByEmail(email: string): Promise<User> {
    let user = await this.users.findOne({ where: { email } });
    if (!user) {
      user = this.users.create({
        email,
      });

      await this.users.save(user);
    }

    return user;
  }
}
