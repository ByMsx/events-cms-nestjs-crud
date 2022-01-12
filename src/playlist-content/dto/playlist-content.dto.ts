import { ApiPropertyOptional } from '@nestjs/swagger';
import { PlaylistDto } from '../../playlists/dto/playlist.dto';
import { ContentDto } from '../../content/dto/content.dto';

export class PlaylistContentDto {
  playlistId: number;
  contentId: number;
  duration: number;
  order: number;

  @ApiPropertyOptional({ type: [PlaylistDto] })
  playlist?: PlaylistDto;

  @ApiPropertyOptional({ type: [ContentDto] })
  content?: ContentDto;
}
