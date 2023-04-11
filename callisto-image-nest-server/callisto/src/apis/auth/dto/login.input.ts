import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({
    example: 'callisto@callisto.net',
    description: '이메일을 작성해주세요.',
  })
  email: string;

  @ApiProperty({
    example: '123456abcdef',
    description: '비밀번호를 작성해주세요.',
  })
  password: string;
}
