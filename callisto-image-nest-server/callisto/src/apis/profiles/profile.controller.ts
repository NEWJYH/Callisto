import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/commons/auth/jwt-access.strategy';
import { JwtAuthGuard } from 'src/commons/auth/jwtAuthGuard';
import { CurrentUser } from 'src/commons/auth/user.params';
import { ProfileService } from './profile.service';

@Controller('/profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService, //
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(
    @CurrentUser() currentUser: JwtPayload, //
  ) {
    //
    console.log('zzzz', currentUser);
  }
}
