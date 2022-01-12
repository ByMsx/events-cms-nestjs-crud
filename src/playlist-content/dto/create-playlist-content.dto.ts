import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
