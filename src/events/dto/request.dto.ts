import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  datetime?: Date;
}
