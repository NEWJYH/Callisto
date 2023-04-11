import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('access') {
  handleRequest(err, user, info, context) {
    console.log('access Guard');
    if (err || !user) {
      throw err || new UnauthorizedException(`${info}\n${context}`);
    }
    return user;
  }
}

@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard('refresh') {
  handleRequest(err, user, info, context) {
    console.log('refresh Guard');
    if (err || !user) {
      throw err || new UnauthorizedException(`${info}\n${context}`);
    }
    return user;
  }
}
