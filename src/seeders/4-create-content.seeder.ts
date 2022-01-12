import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateContentSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('content')
      .values([
        {
          type: 'video',
          href: '/upload/video.mp4',
          ownerId: 1,
        },
        {
          type: 'image',
          href: '/upload/peace.jpg',
          ownerId: 1,
        },
        {
          type: 'html',
          href: '/upload/index.html',
          ownerId: 1,
        },
        {
          type: 'audio',
          href: '/upload/audio.mp3',
          ownerId: 1,
        },
      ])
      .execute();
  }
}
