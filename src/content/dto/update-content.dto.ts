import { IsEnum, IsOptional } from 'class-validator';
import { ContentType } from './content-type.enum';

export class UpdateContentDto {
  @IsOptional()
  @IsEnum(ContentType)
  type: ContentType;
}
