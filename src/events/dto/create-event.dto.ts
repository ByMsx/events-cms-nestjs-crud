import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsDateString()
  @IsDefined()
  datetime: Date;
}
