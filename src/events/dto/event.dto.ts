import { Exclude } from 'class-transformer';

export class EventDto {
  id: number;
  title: string;
  datetime: Date;

  @Exclude()
  ownerId: number;
}
