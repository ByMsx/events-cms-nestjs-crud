import { ContentType } from './content-type.enum';
import { IsDefined, IsEnum } from 'class-validator';

export class CreateContentDto {
  @IsDefined()
  @IsEnum(ContentType)
  type: ContentType;
}
