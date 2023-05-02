import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}
  //

  setRefreshToken({ email, profile_id, res }) {
    console.log('RefreshToken발행');
    const refreshToken = this.jwtService.sign(
      { email: email, sub: profile_id },
      { secret: process.env.JWT_RSECRET, expiresIn: '2w' },
    );
    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    return refreshToken;
  }

  getAccessToken({ email, profile_id }) {
    console.log('AccessToken발행');
    return this.jwtService.sign(
      { email: email, sub: profile_id },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
  }
}
