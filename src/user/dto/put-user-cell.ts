/*
 * @Author: Aven
 * @Date: 2021-04-01 14:57:14
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 16:37:15
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export interface Data {
  name: string;
  fishes: number;
  hash: string;
}

export class PutUserCellDto {
  @ApiProperty({
    type: String,
    description: 'capacity',
  })
  @IsNotEmpty()
  capacity: string;

  @ApiProperty({
    type: String,
    description: 'lock',
  })
  @IsNotEmpty()
  lock: string;

  @ApiProperty({
    type: JSON,
    description: 'data',
  })
  @IsNotEmpty()
  data: Data;
}
