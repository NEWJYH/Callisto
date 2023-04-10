import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobInput {
  @ApiProperty({
    example: 9999,
    description: 'job아이디를 숫자로 작성해주세요.',
  })
  job_id: number;

  @ApiProperty({
    example: 'job 이름',
    description: '수정할 job 이름을 작성해주세요.',
  })
  job_name: string;
}
