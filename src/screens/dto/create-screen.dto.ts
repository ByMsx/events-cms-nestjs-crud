import { IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScreenDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  playlistId: number;
}
