import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class EventDto {
  id: number;
  title: string;
  datetime: Date;

  @Exclude()
  @ApiHideProperty()
  ownerId: number;
}
