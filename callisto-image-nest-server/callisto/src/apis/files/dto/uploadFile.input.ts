import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class UpLoadFileInput {
  @ApiProperty({
    example: '1',
    description: '버킷 아이디를 입력하세요.',
  })
  @IsNumberString()
  bucket_id: string;
}
