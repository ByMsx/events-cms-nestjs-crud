import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as md5 from 'md5';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(repo: UsersRepository) {
    super(repo);
  }

  hashPassword(s: string): string {
    return md5(s);
  }

  findUserByEmailAndPassword(email: string, password: string): Promise<User> {
    return this.findOne({
      email,
      passwordHash: this.hashPassword(password),
    });
  }
}
