import { define, factory } from 'typeorm-seeding';
import { Screen } from '../../screens/entities/screen.entity';
import { Event } from '../../events/entities/event.entity';
import { Playlist } from '../../playlists/entities/playlist.entity';

define(Screen, (faker) => {
  const s = new Screen();
  s.event = factory(Event)() as any;
  s.playlist = factory(Playlist)() as any;
  return s;
});
