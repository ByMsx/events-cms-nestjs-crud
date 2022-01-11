import { Playlist } from '../../playlists/entities/playlist.entity';

export class PlaylistContentDto {
  playlistId: number;
  contentId: number;
  duration: number;
  order: number;

  playlist?: Playlist;
}
