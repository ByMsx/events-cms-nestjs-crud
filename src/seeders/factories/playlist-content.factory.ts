import { PlaylistContent } from '../../playlist-content/entities/playlist-content.entity';
import { define, factory } from 'typeorm-seeding';
import { Playlist } from '../../playlists/entities/playlist.entity';
import { ContentGroup } from '../../content-group/entities/content-group.entity';

define(PlaylistContent, (faker) => {
  const pc = new PlaylistContent();
  pc.contentGroup = factory(ContentGroup)() as any;
  pc.playlist = factory(Playlist)() as any;
  pc.order = faker.random.number(10);
  pc.duration = faker.random.number(300);
  return pc;
});
