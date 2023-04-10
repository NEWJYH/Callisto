import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ParamsUserClassId {
  @ApiProperty({
    example: 1,
    description: 'params',
  })
  @IsNumberString()
  id: string;
}
