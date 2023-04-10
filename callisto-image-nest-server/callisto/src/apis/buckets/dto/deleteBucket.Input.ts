import { ApiProperty } from '@nestjs/swagger';

export class DeleteBucketInput {
  @ApiProperty({
    example: 1,
    description: '삭제할 버킷 아이디를 숫자로 입력하세요.',
  })
  bucket_id: number;
}
