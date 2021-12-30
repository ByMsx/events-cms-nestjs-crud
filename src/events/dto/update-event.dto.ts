import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  datetime: Date;
}
