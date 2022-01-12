import { ContentType } from './content-type.enum';
import { IsDefined, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsDefined()
  @IsEnum(ContentType)
  @ApiProperty({ enum: ContentType, type: 'enum' })
  type: ContentType;
}
