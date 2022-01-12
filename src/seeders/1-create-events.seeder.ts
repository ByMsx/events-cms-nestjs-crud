import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateEventsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('event')
      .values([
        {
          id: 1,
          title: 'Test event #1',
          datetime: '2020-12-31 00:00:00',
          ownerId: 1,
        },
        {
          id: 2,
          title: 'Test event #2',
          datetime: '2020-12-31 00:00:00',
          ownerId: 1,
        },
      ])
      .execute();
  }
}
