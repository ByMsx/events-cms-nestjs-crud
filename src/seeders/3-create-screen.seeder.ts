import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateScreenSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('screen')
      .values([
        {
          playlistId: 1,
          eventId: 1,
        },
        {
          playlistId: 2,
          eventId: 1,
        },
        {
          playlistId: 2,
          eventId: 2,
        },
      ])
      .execute();
  }
}
