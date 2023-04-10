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
import { CreateJobInput } from './dto/createJob.input';
import { Job } from './entities/job.entity';
import { JobService } from './job.service';
import { ParamsJobId } from './dto/paramsJobId.input';
import { UpdateJobInput } from './dto/updateJob.input';
import { DeleteJobInput } from './dto/deleteJob.input';

@ApiTags('job API')
@Controller('/jobs')
export class JobController {
  //
  constructor(private readonly jobService: JobService) {}
  // create
  @ApiOperation({ summary: 'job 생성 API', description: 'job을 생성한다.' })
  @ApiCreatedResponse({ description: 'job을 생성한다.', type: Job })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
  })
  @Post()
  async createJob(@Body() createJobInput: CreateJobInput) {
    const { job_name } = createJobInput;
    // 1. 새로 만들려는 job 이름이 존재하는지 확인
    const isExists = await this.jobService.jobExists(job_name);
    // 2. 이미 등록되어 있다면 예외 발생
    if (isExists) {
      throw new ConflictException('이미 등록되었습니다.');
    }
    // 3. 등록 되어 있지 않다면 등록하고 job 반환
    return await this.jobService.create(job_name);
  }
  // getAll
  @ApiOperation({
    summary: 'job 전체 조회 API',
    description: 'job을 전체 조회합니다.',
  })
  @ApiOkResponse({ description: 'job을 전체 조회.', type: [Job] })
  @Get()
  async findAll() {
    return await this.jobService.findAll();
  }
  // findOneById
  @ApiOperation({
    summary: 'job parameter 조회 API',
    description: 'id로 단일 job을 검색합니다.',
  })
  @ApiOkResponse({ description: 'job을 파라미터 값으로 조회.', type: Job })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: '존재하지 않음',
  })
  @Get('/:id')
  async findOneById(@Param() paramsId: ParamsJobId) {
    const { id } = paramsId;
    const Id = parseInt(id);
    // 1. job이 존재하는 지 확인
    const job = await this.jobService.findOneById(Id);
    if (!job) {
      // 2. job이 존재하지 않는다면 에러 발생
      throw new UnprocessableEntityException('존재하지 않는 id입니다.');
    }
    // 3. 존재한다면 job 객체 반환
    return job;
  }
  // update
  @ApiOperation({ summary: 'job 수정 API', description: 'job을 수정한다.' })
  @ApiOkResponse({ description: 'job을 수정.', type: Job })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @Patch()
  async updateJob(@Body() updateJobInput: UpdateJobInput) {
    const { job_id, job_name } = updateJobInput;
    // 1. job이 존재하는지 확인
    const checkJob = await this.jobService.findOneById(job_id);
    if (!checkJob) {
      // 2. job이 존재하지 않는다면 에러 발생
      throw new NotFoundException(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    }
    // 3. job 업데이트 후 반환
    return await this.jobService.update(checkJob, job_name);
  }

  // delete
  @ApiOperation({ summary: 'job 삭제 API', description: 'job을 삭제한다.' })
  @ApiOkResponse({ description: 'job을 삭제.', type: Boolean })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @Delete()
  async deleteJob(@Body() deleteJobInput: DeleteJobInput) {
    const { job_id } = deleteJobInput;
    // 1. job이 존재하는지 확인
    const checkJob = await this.jobService.findOneById(job_id);
    if (!checkJob) {
      // 2. job이 존재하지 않는다면 에러 발생
      throw new NotFoundException(
        '해당 id가 존재하지 않습니다. 유효한 id를 입력해주세요.',
      );
    }
    // 3. 존재한다면 삭제
    return await this.jobService.delete(job_id);
  }
}
