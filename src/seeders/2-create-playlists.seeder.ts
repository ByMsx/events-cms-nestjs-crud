import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreatePlaylistsSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('playlist')
      .values([
        {
          id: 1,
          title: 'Testing playlist #1',
          ownerId: 1,
        },
        {
          id: 2,
          title: 'Testing playlist #2',
          ownerId: 1,
        },
      ])
      .execute();
  }
}
