import { Exclude } from 'class-transformer';
import { PlaylistContentDto } from '../../playlist-content/dto/playlist-content.dto';

export class PlaylistDto {
  id: number;
  title: string;

  contents?: PlaylistContentDto[];

  @Exclude()
  ownerId: number;
}
