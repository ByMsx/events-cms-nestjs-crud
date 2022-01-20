import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ContentDto {
  @ApiProperty()
  id: number;

  @Exclude()
  @ApiHideProperty()
  filename: string;

  @Exclude()
  @ApiHideProperty()
  groupId: number;
}

export class SignedUrlDto {
  @ApiProperty()
  url: string;
}

export type CreateContentResponseDto = ContentDto & SignedUrlDto;
