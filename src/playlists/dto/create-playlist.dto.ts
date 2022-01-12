import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}
