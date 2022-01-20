import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Event } from '../events/entities/event.entity';
import { Screen } from '../screens/entities/screen.entity';
import { Playlist } from '../playlists/entities/playlist.entity';
import { PlaylistContent } from '../playlist-content/entities/playlist-content.entity';
import { ContentGroup } from '../content-group/entities/content-group.entity';

export default class CreateFullUserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const user = await factory(User)().create();
    const events = await factory(Event)()
      .map(async (event: Event) => {
        event.owner = user;
        return event;
      })
      .createMany(5);

    const contentGroup = await factory(ContentGroup)()
      .map(async (content: ContentGroup) => {
        content.owner = user;
        return content;
      })
      .createMany(15);

    const playlists = await factory(Playlist)()
      .map(async (playlist) => {
        playlist.owner = user;
        return playlist;
      })
      .createMany(5);

    let i = 0;
    await factory(PlaylistContent)()
      .map(async (playlistContent) => {
        playlistContent.playlist = playlists[i % 5];
        playlistContent.contentGroup = contentGroup[i];
        i++;
        return playlistContent;
      })
      .createMany(15);

    i = 0;
    await factory(Screen)()
      .map(async (screen) => {
        screen.playlist = playlists[i % 5];
        screen.event = events[i % 5];
        i++;
        return screen;
      })
      .createMany(10);
  }
}
