import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

//REVIEW: не забывай IsDefined или IsOptional
export class SignInDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(8, 16)
  @ApiProperty({ type: 'string', maxLength: 16, minLength: 8 })
  password: string;
}
