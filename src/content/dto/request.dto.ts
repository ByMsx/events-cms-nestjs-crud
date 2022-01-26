import { IsDefined, IsOptional, MaxLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsDefined()
  @ApiProperty()
  @MaxLength(64)
  extra: string;

  @IsDefined()
  @ApiProperty()
  @MaxLength(64)
  fileKey: string;

  @ApiHideProperty()
  href: string;
}

export class UpdateContentDto {
  @IsOptional()
  @ApiProperty()
  contentGroupId?: number;

  @IsOptional()
  @ApiProperty()
  @MaxLength(64)
  extra?: string;
}

export class GetUploadLinkDto {
  @IsDefined()
  @ApiProperty()
  @MaxLength(64)
  filename: string;
}
