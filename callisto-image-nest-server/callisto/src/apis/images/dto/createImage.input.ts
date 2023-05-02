import { ApiProperty } from '@nestjs/swagger';

export class CreateImageInput {
  @ApiProperty({
    example: 'https:nel.cloudflare.com',
    description: '업로드완료된 이미지 url을 넣어주세요.',
  })
  url: string;

  @ApiProperty({
    example: 1,
    description: '버킷 목록에서 선택',
  })
  bucket_id: number;
}
