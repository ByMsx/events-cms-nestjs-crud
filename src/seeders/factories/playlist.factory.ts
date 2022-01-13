import { Playlist } from '../../playlists/entities/playlist.entity';
import { define, factory } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';

define(Playlist, (faker) => {
  const playlist = new Playlist();
  playlist.owner = factory(User)() as any;
  playlist.title = faker.random.words(2).slice(0, 32);
  return playlist;
});
