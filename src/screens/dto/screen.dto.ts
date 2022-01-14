import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ScreenDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  playlistId: number;

  @Exclude()
  @ApiHideProperty()
  eventId: number;
}
