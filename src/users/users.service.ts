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

  async signUp(data: { email: string; password: string; fullName: string }) {
    //REVIEW: А как-то проверяется, что пользователь с таким email уже зарегистрирован?
    const { email, fullName } = data;

    //REVIEW: save забыл))
    return this.repo.create({
      email,
      fullName,
      passwordHash: this.hashPassword(data.password),
    });
  }

  //REVIEW: можно сделать private
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
