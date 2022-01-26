import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ContentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  href: string;

  @Exclude()
  @ApiHideProperty()
  fileKey: string;

  @Exclude()
  @ApiHideProperty()
  groupId: number;
}

export class GetUploadLinkResponseDto {
  @ApiProperty()
  url: string;

  @ApiProperty({
    type: 'string',
    description: 'Use this key in CreateContentDto after file uploading',
  })
  fileKey: string;
}
