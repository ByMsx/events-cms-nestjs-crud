import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//REVIEW: это должно лежать в auth.module )
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
