import { ApiProperty } from '@nestjs/swagger';

export class UpdateBucketInput {
  @ApiProperty({
    example: 9999,
    description: '버킷아이디를 숫자로 작성해주세요.',
  })
  bucket_id: number;

  @ApiProperty({
    example: '버킷 이름',
    description: '수정할 버킷 이름을 작성해주세요.',
  })
  bucket_name: string;
}
