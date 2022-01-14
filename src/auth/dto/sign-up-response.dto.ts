import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class SignUpResponseDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @Exclude()
  @ApiHideProperty()
  passwordHash: string;
}
