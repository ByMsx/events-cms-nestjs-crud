import { IsDefined, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @IsDefined()
  @ApiProperty()
  contentGroupId: number;

  @IsDefined()
  @ApiProperty()
  @MaxLength(64)
  extra: string;

  @IsDefined()
  @ApiProperty()
  filename: string;
}

export class UpdateContentDto {
  @IsOptional()
  @ApiProperty()
  contentGroupId?: number;

  @IsOptional()
  @ApiProperty()
  @MaxLength(64)
  extra?: string;
}
