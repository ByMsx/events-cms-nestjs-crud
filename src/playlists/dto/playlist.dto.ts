import { Exclude } from 'class-transformer';
import { PlaylistContentDto } from '../../playlist-content/dto/playlist-content.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PlaylistDto {
  id: number;
  title: string;

  @ApiProperty({ type: [PlaylistContentDto] })
  contents?: PlaylistContentDto[];

  @Exclude()
  ownerId: number;
}
