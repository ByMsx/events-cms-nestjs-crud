import { IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsEmail()
  @IsDefined()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(8, 16)
  @IsDefined()
  @ApiProperty({ type: 'string', maxLength: 16, minLength: 8 })
  password: string;

  @IsString()
  @Length(0, 128)
  @IsDefined()
  @ApiProperty({ type: 'string', maxLength: 128 })
  fullName: string;
}
