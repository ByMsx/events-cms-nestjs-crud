import { ContentType } from './content-type.enum';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ContentDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: 'enum', enum: ContentType })
  type: ContentType;
  href: string;

  @Exclude()
  @ApiHideProperty()
  ownerId: number;
}
