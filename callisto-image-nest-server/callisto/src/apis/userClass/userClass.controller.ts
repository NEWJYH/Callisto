import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserClassInput } from './dto/createUserClass.input';
import { DeleteUserClassInput } from './dto/deleteUserClass.input';
import { ParamsUserClassId } from './dto/paramsUserClassId.input';
import { UpdateUserClassInput } from './dto/updateUserClass.input';
import { UserClass } from './entities/userClass.entity';
import { UserClassService } from './userClass.service';

@ApiTags('userclass API')
@Controller('/userclass')
export class UserClassController {
  //
  constructor(
    private readonly userClassService: UserClassService, //
  ) {}
  //
  @ApiOperation({
    summary: 'userclass 생성 API',
    description: 'userclass를 생성한다.',
  })
  @ApiCreatedResponse({ description: 'userclass를 생성한다.', type: UserClass })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
  })
  @Post()
  async createUserClass(@Body() createUserClassInput: CreateUserClassInput) {
    const { user_class_name } = createUserClassInput;
    // 1. 새로 만들려는 유저클래스 이름이 존재하는지 확인
    const isExists = await this.userClassService.userClassExists(
      user_class_name,
    );
    // 2. 이미 등록되어 있다면 예외 발생
    if (isExists) {
      throw new ConflictException('이미 등록되었습니다.');
    }
    // 3. 등록되어 있지 않다면 등록하고 유저클래스 반환
    return await this.userClassService.create(user_class_name);
  }
  //
  @ApiOperation({
    summary: 'userclass 전체 조회 API',
    description: 'userclass를 전체 조회합니다.',
  })
  @ApiOkResponse({ description: 'userclass를 전체 조회.', type: [UserClass] })
  @Get()
  async findAll() {
    return await this.userClassService.findAll();
  }
  //
  @ApiOperation({
    summary: 'userclass를 parameter 조회 API',
    description: 'id로 단일 userclass를 검색합니다.',
  })
  @ApiOkResponse({
    description: 'userclass를 파라미터 값으로 조회.',
    type: UserClass,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: '존재하지 않음',
  })
  @Get('/:id')
  async findOneById(@Param() paramsId: ParamsUserClassId) {
    const { id } = paramsId;
    const Id = parseInt(id);
    // id값에 따른 userClass가 존재하는지 확인
    const userClass = await this.userClassService.findOneById(Id);
    if (!userClass) {
      // 2. id값에 따른 userClass가 존재하지 않는다면 에러 발생
      throw new UnprocessableEntityException('존재하지 않는 id 입니다.');
    }
    // 3. 존재한다면 userClass 반환
    return userClass;
  }
  // update
  @ApiOperation({
    summary: 'userclass 수정 API',
    description: 'userclass를 수정한다.',
  })
  @ApiOkResponse({ description: 'userclass를 수정.', type: UserClass })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @Patch()
  async updateUserClass(@Body() updateUserClassInput: UpdateUserClassInput) {
    const { user_class_id, user_class_name } = updateUserClassInput;

    // 1. userclass id가 존재하는지 확인
    const checkUserClass = await this.userClassService.findOneById(
      user_class_id,
    );
    if (!checkUserClass) {
      // 2. 유저 클래스 id가 존재하지 않는다면 에러 발생
      throw new NotFoundException(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    }
    // 3. 유저클래스 아이디가 존재한다면
    return await this.userClassService.update(checkUserClass, user_class_name);
  }

  // delete
  @ApiOperation({
    summary: 'userclass 삭제 API',
    description: 'userclass를 삭제한다.',
  })
  @ApiOkResponse({ description: 'userclass를 삭제.', type: Boolean })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @Delete()
  async deleteUserClass(@Body() deleteUserClassInput: DeleteUserClassInput) {
    const { user_class_id } = deleteUserClassInput;

    // 1. 유저 클래스 id가 존재하는지 확인
    const checkUserClass = await this.userClassService.findOneById(
      user_class_id,
    );
    if (!checkUserClass) {
      // 2. userclass id가 존재하지 않는다면 에러 발생
      throw new NotFoundException(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    }
    // 3. 존재한다면 삭제
    return await this.userClassService.delete(user_class_id);
  }
}
