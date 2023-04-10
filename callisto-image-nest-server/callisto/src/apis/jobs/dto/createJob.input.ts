import { ApiProperty } from '@nestjs/swagger';

export class CreateJobInput {
  @ApiProperty({
    example: '변호사',
    description: '버킷이름을 작성해주세요.',
  })
  job_name: string;
}
