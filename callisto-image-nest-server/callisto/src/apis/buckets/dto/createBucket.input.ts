import { ApiProperty } from '@nestjs/swagger';

export class CreateBucketInput {
  @ApiProperty({
    example: 'company',
    description: '버킷이름을 작성해주세요.',
  })
  bucket_name: string;
}
