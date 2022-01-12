import { IsEnum, IsOptional } from 'class-validator';
import { ContentType } from './content-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContentDto {
  @IsOptional()
  @IsEnum(ContentType)
  @ApiProperty({ type: 'enum', enum: ContentType })
  type: ContentType;
}
