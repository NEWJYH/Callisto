import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Profile,
    ]),
    JwtModule.register({}), // Jwt
  ],
  controllers: [AuthController],
  providers: [
    JwtRefreshStrategy,
    AuthService, //
    UserService,
  ],
})
export class AuthModule {}
