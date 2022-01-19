import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as md5 from 'md5';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(repo: UsersRepository) {
    super(repo);
  }

  async signUp(data: { email: string; password: string; fullName: string }) {
    const { email, fullName } = data;

    const user = this.repo.create({
      email,
      fullName,
      passwordHash: UsersService.hashPassword(data.password),
    });

    try {
      await this.repo.save(user);
      return user;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        // REVIEW: а вдруг там не по email сработает unique ограничение?
        // я бы делал запрос на ИД пользователя с этим email. И если такой есть - то BadRequest. Но можем обсудить
        if (e.driverError.code === '23505') {
          //REVIEW: можно использовать BadRequestException
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              message: 'Email already used by other user',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw e;
    }
  }

  findUserByEmailAndPassword(email: string, password: string): Promise<User> {
    return this.findOne({
      email,
      passwordHash: UsersService.hashPassword(password),
    });
  }

  private static hashPassword(s: string): string {
    return md5(s);
  }
}
