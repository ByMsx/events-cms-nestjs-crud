import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as md5 from 'md5';

export default class CreateUserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([
        { id: 1, passwordHash: md5('123123123'), email: 'user@domain.ltd' },
      ])
      .execute();
  }
}
