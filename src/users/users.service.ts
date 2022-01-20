import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { QueryFailedError } from 'typeorm';
import { PG_UNIQUE_CONSTRAINT_FAIL_ERROR_CODE } from '../common/constants';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(protected repo: UsersRepository) {
    super(repo);
  }

  async signUp(data: { email: string; password: string; fullName: string }) {
    const user = this.repo.createWithPassword(data);

    try {
      await this.repo.save(user);
      return user;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (e.driverError.code === PG_UNIQUE_CONSTRAINT_FAIL_ERROR_CODE) {
          throw new BadRequestException(
            {
              error: {
                message: 'Email already used by other user',
                code: 'sign-up/unique',
                fields: ['email'],
              },
            },
            'Email already used by other user',
          );
        }
      }

      throw e;
    }
  }
}
