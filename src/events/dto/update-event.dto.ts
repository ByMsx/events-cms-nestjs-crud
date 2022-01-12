import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
