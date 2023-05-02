import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/commons/auth/jwt-access.strategy';
import { JwtAuthGuard } from 'src/commons/auth/jwtAuthGuard';
import { CurrentUser } from 'src/commons/auth/user.params';
import { UpdateProfileInput } from './dto/updateProfile.input';
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
    //i
    const { sub } = currentUser;

    // console.log(email, sub);
    const profile = await this.profileService.findOne(sub);
    return profile.nick_name;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProfile(
    @CurrentUser() currentUser: JwtPayload,
    @Body() updateProfileInput: UpdateProfileInput, //
  ) {
    const { sub: profileId } = currentUser;
    const { nick_name: nickName } = updateProfileInput;
    return await this.profileService.update(profileId, nickName);
  }
}
