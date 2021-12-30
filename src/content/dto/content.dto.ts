import { ContentType } from './content-type.enum';
import { Exclude } from 'class-transformer';

export class ContentDto {
  id: number;
  type: ContentType;
  href: string;

  @Exclude()
  ownerId: number;
}
