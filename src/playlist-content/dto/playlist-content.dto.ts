import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlaylistDto } from '../../playlists/dto/playlist.dto';
import { ContentDto } from '../../content/dto/response.dto';

export class PlaylistContentDto {
  @ApiProperty()
  playlistId: number;

  @ApiProperty()
  contentId: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  order: number;

  @ApiPropertyOptional({ type: [PlaylistDto] })
  playlist?: PlaylistDto;

  @ApiPropertyOptional({ type: [ContentDto] })
  content?: ContentDto;
}
