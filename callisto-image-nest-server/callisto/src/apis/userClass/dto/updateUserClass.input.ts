import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserClassInput {
  @ApiProperty({
    example: 9999,
    description: 'userclass id를 숫자로 작성해주세요.',
  })
  user_class_id: number;

  @ApiProperty({
    example: 'userclass 이름',
    description: '수정할 userclass 이름을 작성해주세요.',
  })
  user_class_name: string;
}
