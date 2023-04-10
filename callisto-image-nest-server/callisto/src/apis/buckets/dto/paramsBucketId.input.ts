import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ParamsBucketId {
  @ApiProperty({
    example: 1,
    description: 'params',
  })
  @IsNumberString()
  id: string;
}
