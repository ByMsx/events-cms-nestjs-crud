import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;
}
