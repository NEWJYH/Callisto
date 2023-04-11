import {
  Body,
  Controller,
  Post,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CurrentUser } from '../../commons/auth/user.params';
import { JwtAuthRefreshGuard } from 'src/commons/auth/jwtAuthGuard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  //

  @Post()
  async login(
    @Body() loginInput: LoginInput, //
    @Res() res: Response,
  ) {
    const { email, password } = loginInput;
    // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾음)
    const user = await this.userService.findOne({ email });

    // 2. 일치하는 유저가 없으면?! 에러 던지기!!!
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    const profile_id = user.profile.profile_id;

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?! 에러 던지기!!!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({ email, profile_id, res });

    // 5. 일치하는 유저가 있으면? accessToken(=JWT)을 만들어서 브라우저에 전달
    const accessToken = this.authService.getAccessToken({ email, profile_id });
    return res.send(accessToken);
  }

  @UseGuards(JwtAuthRefreshGuard)
  @Post('/restore')
  async restoreAccessToken(
    @CurrentUser() currentUser, //
  ) {
    const { email, profile_id } = currentUser;
    console.log('restoreAccessToken auth-controller');
    console.log('restoreCur', { ...currentUser });
    return this.authService.getAccessToken({ email, profile_id });
  }
}
