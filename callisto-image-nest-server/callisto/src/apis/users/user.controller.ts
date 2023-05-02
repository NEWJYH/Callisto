import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserClassService } from '../userClass/userClass.service';
import { JwtAuthGuard } from 'src/commons/auth/jwtAuthGuard';
import { JwtPayload } from 'src/commons/auth/jwt-access.strategy';
import { CurrentUser } from 'src/commons/auth/user.params';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user API')
@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService, //

    private readonly userClassService: UserClassService,
  ) {}
  // create
  @Post()
  async createUser(@Body() createUserInput: CreateUserInput) {
    const { email, password, user_class_id } = createUserInput;
    // 가입할수 있는 이메일인지 검증
    // 검증 추가해야함

    // 1. 이미 등록된 이메일인지 확인
    const isExists = await this.userService.userExists(email);
    // 2. 이미 등록되어 있다면 예외 발생
    console.log(isExists);
    if (isExists) {
      throw new ConflictException('이미 등록되었습니다.');
    }
    // 3. 유저클래스 검증
    const userClass = await this.userClassService.findOneById(user_class_id);
    if (!userClass) {
      // 4. 유저클래스가 없다면?
      throw new ConflictException('잘못된 유저 클래스입니다.');
    }
    // 5. 등록되어 있지 않다면  등록
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const user: User = await this.userService.create(
      email,
      hashedPassword,
      userClass,
    );

    // 이메일 검증 메시지 발송
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/verified')
  async updateVerified(@CurrentUser() currentUser: JwtPayload) {
    const { email } = currentUser;
    const user = await this.userService.updateVerified({ email });
    // TODO 예외 처리
    return user.verified;
  }
}
