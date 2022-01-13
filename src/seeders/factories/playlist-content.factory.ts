import { PlaylistContent } from '../../playlist-content/entities/playlist-content.entity';
import { define, factory } from 'typeorm-seeding';
import { Content } from '../../content/entities/content.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';

define(PlaylistContent, (faker) => {
  const pc = new PlaylistContent();
  pc.content = factory(Content)() as any;
  pc.playlist = factory(Playlist)() as any;
  pc.order = faker.random.number(10);
  pc.duration = faker.random.number(300);
  return pc;
});
