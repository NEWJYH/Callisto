import { ApiProperty } from '@nestjs/swagger';

export class CreateUserClassInput {
  @ApiProperty({
    example: '학생',
    description: '유저클래스 이름을 작성해주세요.',
  })
  user_class_name: string;
}
