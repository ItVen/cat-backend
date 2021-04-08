/*
 * @Author: Aven
 * @Date: 2021-04-01 14:57:14
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-08 23:39:04
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
    description: 'name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'block_number',
  })
  @IsNotEmpty()
  block_number: string;

  @ApiProperty({
    type: Object,
    description: 'out_point',
  })
  out_point: Record<string, unknown>;

  @ApiProperty({
    type: JSON,
    description: 'output',
  })
  @IsNotEmpty()
  output: Record<string, unknown>;

  @ApiProperty({
    type: String,
    description: 'output_data',
  })
  @IsNotEmpty()
  output_data: string;

  @ApiProperty({
    type: String,
    description: 'tx_index',
  })
  @IsNotEmpty()
  tx_index: string;
}
