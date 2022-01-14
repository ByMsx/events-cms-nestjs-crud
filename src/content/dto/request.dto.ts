import { ContentType } from './content-type.enum';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsDefined()
  @IsEnum(ContentType)
  @ApiProperty({ enum: ContentType, type: 'enum' })
  type: ContentType;
}

export class UpdateContentDto {
  @IsOptional()
  @IsEnum(ContentType)
  @ApiProperty({ type: 'enum', enum: ContentType })
  type?: ContentType;
}
