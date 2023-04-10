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
import { BucketService } from './bucket.service';
import { CreateBucketInput } from './dto/createBucket.input';
import { DeleteBucketInput } from './dto/deleteBucket.Input';
import { ParamsBucketId } from './dto/paramsBucketId.input';
import { UpdateBucketInput } from './dto/updateBucket.input';
import { Bucket } from './entities/bucket.entity';

@ApiTags('bucket API')
@Controller('/buckets')
export class BucketController {
  //
  constructor(
    private readonly bucketService: BucketService, //
  ) {}

  // create
  @ApiOperation({ summary: '버킷 생성 API', description: '버킷을 생성한다.' })
  @ApiCreatedResponse({ description: '버킷을 생성한다.', type: Bucket })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
  })
  @Post()
  async createBucket(@Body() createBucketInput: CreateBucketInput) {
    const { bucket_name } = createBucketInput;
    // 1. 새로 만들려는 버킷이름이 존재하는지 확인
    const isExists = await this.bucketService.bucketExists(bucket_name);
    // 2. 이미 등록되어 있다면 예외 발생
    if (isExists) {
      throw new ConflictException('이미 등록되었습니다.');
    }
    // 3. 등록되어 있지 않다면 등록하고 버킷 반환
    return await this.bucketService.create(bucket_name);
  }

  // getAll
  @ApiOperation({
    summary: '버킷 전체 조회 API',
    description: '버킷을 전체 조회합니다.',
  })
  @ApiOkResponse({ description: '버킷을 전체 조회.', type: [Bucket] })
  @Get()
  async findAll() {
    return await this.bucketService.findAll();
  }

  // get
  @ApiOperation({
    summary: '버킷 parameter 조회 API',
    description: 'id로 단일 버킷을 검색합니다.',
  })
  @ApiOkResponse({ description: '버킷을 파라미터 값으로 조회.', type: Bucket })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: '존재하지 않음',
  })
  @Get('/:id')
  async findOneById(@Param() paramsId: ParamsBucketId) {
    const { id } = paramsId;
    const Id = parseInt(id);
    // 1. 버킷이 존재하는 지 확인
    const bucket = await this.bucketService.findOneById(Id);
    if (!bucket) {
      // 2. 버킷이 존재하지 않는다면 에러 발생
      throw new UnprocessableEntityException('존재하지 않는 id입니다.');
    }
    // 3. 존재한다면 버킷 객체 반환
    return bucket;
  }

  // update
  @ApiOperation({ summary: '버킷 수정 API', description: '버킷을 수정한다.' })
  @ApiOkResponse({ description: '버킷을 수정.', type: Bucket })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @Patch()
  async updateBucket(@Body() updateBucketInput: UpdateBucketInput) {
    const { bucket_id, bucket_name } = updateBucketInput;
    // 1. 버킷이 존재하는지 확인
    const checkBucket = await this.bucketService.findOneById(bucket_id);
    if (!checkBucket) {
      // 2. 버킷이 존재하지 않는다면 에러 발생
      throw new NotFoundException(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    }
    // 3. 버킷 업데이트 후 반환
    return await this.bucketService.update(checkBucket, bucket_name);
  }

  // delete
  @ApiOperation({ summary: '버킷 삭제 API', description: '버킷을 삭제한다.' })
  @ApiOkResponse({ description: '버킷을 삭제.', type: Boolean })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @Delete()
  async deleteBucket(@Body() deleteBucketInput: DeleteBucketInput) {
    const { bucket_id } = deleteBucketInput;
    // 1. 버킷이 존재하는지 확인
    const checkBucket = await this.bucketService.findOneById(bucket_id);
    if (!checkBucket) {
      // 2. 버킷이 존재하지 않는다면 에러 발생
      throw new NotFoundException(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    }
    // 3. 존재한다면 삭제
    return await this.bucketService.delete(bucket_id);
  }
}
