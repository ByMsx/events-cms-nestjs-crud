import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty()
  @IsDefined()
  email: string;

  @IsDefined()
  @IsString()
  @Length(8, 16)
  @ApiProperty({ type: 'string', maxLength: 16, minLength: 8 })
  password: string;
}
