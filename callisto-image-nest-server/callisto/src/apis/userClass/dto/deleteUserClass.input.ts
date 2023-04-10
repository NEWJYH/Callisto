import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserClassInput {
  @ApiProperty({
    example: 1,
    description: '삭제할 userclass id를 숫자로 입력하세요.',
  })
  user_class_id: number;
}
