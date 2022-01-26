import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { ContentType } from './content-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentGroupDto {
  @IsDefined()
  @IsEnum(ContentType)
  @ApiProperty({ type: 'enum', enum: ContentType })
  type: ContentType;
}

export class UpdateContentGroupDto {
  @IsOptional()
  @IsEnum(ContentType)
  @ApiProperty({ type: 'enum', enum: ContentType })
  type?: ContentType;
}
