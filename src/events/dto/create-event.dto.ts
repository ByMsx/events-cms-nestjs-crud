import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(32)
  @ApiProperty()
  title: string;

  @IsDateString()
  @IsDefined()
  @ApiProperty()
  datetime: Date;
}
