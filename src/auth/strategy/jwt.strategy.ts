import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthService } from '../auth.service';

interface Auth0JwtPayload {
  'https://localhost/email': string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      audience: process.env.AUTH0_AUDIENCE,
      algorithms: ['RS256'],
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Auth0JwtPayload) {
    const email = payload['https://localhost/email'];
    return this.auth.validateByEmail(email);
  }
}
