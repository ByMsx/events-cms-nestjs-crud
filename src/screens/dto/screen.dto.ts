import { Exclude } from 'class-transformer';

export class ScreenDto {
  id: number;
  playlistId: number;

  @Exclude()
  eventId: number;
}
