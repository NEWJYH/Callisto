import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log('refresh Strategy');
        const cookie = req.headers.cookie;
        console.log(cookie);
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_RSECRET,
    });
  }

  validate(payload) {
    console.log('refresh payload');
    console.log(payload); // { email: c@c.com, sub: qkwefuasdij-012093sd }
    return payload;
  }
}
