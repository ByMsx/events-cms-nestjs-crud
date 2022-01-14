import { Exclude } from 'class-transformer';
import { PlaylistContentDto } from '../../playlist-content/dto/playlist-content.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class PlaylistDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: [PlaylistContentDto] })
  contents?: PlaylistContentDto[];

  @Exclude()
  @ApiHideProperty()
  ownerId: number;
}
