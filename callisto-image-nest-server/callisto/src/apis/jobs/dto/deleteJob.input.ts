import { ApiProperty } from '@nestjs/swagger';

export class DeleteJobInput {
  @ApiProperty({
    example: 1,
    description: '삭제할 job 아이디를 숫자로 입력하세요.',
  })
  job_id: number;
}
