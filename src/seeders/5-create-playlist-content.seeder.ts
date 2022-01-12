import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreatePlaylistContentSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('playlist_content')
      .values([
        {
          contentId: 1,
          playlistId: 1,
          duration: 10,
          order: 1,
        },
        {
          contentId: 2,
          playlistId: 1,
          duration: 10,
          order: 2,
        },
        {
          contentId: 3,
          playlistId: 1,
          duration: 60,
          order: 3,
        },
        {
          contentId: 1,
          playlistId: 2,
          duration: 60,
          order: 1,
        },
      ])
      .execute();
  }
}
