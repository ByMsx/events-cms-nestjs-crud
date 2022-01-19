import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as md5 from 'md5';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private static hashPassword(s: string): string {
    return md5(s);
  }

  createWithPassword(
    entityLike: DeepPartial<User> & { password?: string },
  ): User {
    const { fullName, email } = entityLike;
    const entityLikePatched: DeepPartial<User> = {
      fullName,
      email,
    };
    entityLikePatched.passwordHash = UsersRepository.hashPassword(
      entityLike.password,
    );
    return super.create(entityLikePatched);
  }

  findUserByEmailAndPassword(email: string, password: string): Promise<User> {
    return this.findOne({
      email,
      passwordHash: UsersRepository.hashPassword(password),
    });
  }
}
