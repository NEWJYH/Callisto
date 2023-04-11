import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({
    example: 'callisto@callisto.net',
    description: '이메일을 입력하세요.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234abc string',
    description: '비밀번호를 입력하세요.',
  })
  password: string;

  @ApiProperty({
    example: 1,
    description: 'user_class_id를 입력해주세요',
  })
  user_class_id: number;
}
