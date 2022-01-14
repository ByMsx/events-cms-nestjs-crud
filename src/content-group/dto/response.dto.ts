import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ContentType } from './content-type.enum';
import { Exclude } from 'class-transformer';
import { ContentDto } from '../../content/dto/response.dto';

export class ContentGroupDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: 'enum', enum: ContentType })
  type: ContentType;

  @ApiProperty()
  contents?: ContentDto;

  @ApiHideProperty()
  @Exclude()
  ownerId: number;
}
