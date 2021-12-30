import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePlaylistDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  title: string;
}
