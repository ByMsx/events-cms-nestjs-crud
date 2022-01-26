import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(protected repo: UsersRepository) {
    super(repo);
  }
}
