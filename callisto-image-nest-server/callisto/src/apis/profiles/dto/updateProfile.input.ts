import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileInput {
  @ApiProperty({
    example: 'callisto_admin',
    description: '변경할 닉네임을 입력하세요.',
  })
  nick_name: string;
}
