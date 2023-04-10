import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ParamsJobId {
  @ApiProperty({
    example: 1,
    description: 'params',
  })
  @IsNumberString()
  id: string;
}
