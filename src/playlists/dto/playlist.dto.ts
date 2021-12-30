import { Exclude } from 'class-transformer';

export class PlaylistDto {
  id: number;
  title: string;

  @Exclude()
  ownerId: number;
}
