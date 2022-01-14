import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @ApiPropertyOptional()
  title?: string;
}
