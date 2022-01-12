import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class ScreenDto {
  id: number;
  playlistId: number;

  @Exclude()
  @ApiHideProperty()
  eventId: number;
}
