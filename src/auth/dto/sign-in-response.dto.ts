import { ApiProperty } from '@nestjs/swagger';

//REVIEW: обычно при sign-in ещё возвращают сущность пользователя
export class SignInResponseDto {
  @ApiProperty()
  token: string;
}
