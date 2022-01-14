import { IsDefined, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaylistContentDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  playlistId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  contentId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  order: number;
}

export class UpdatePlaylistContentDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  playlistId?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  contentId?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  duration?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  order?: number;
}
