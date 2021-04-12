/*
 * @Author: Aven
 * @Date: 2021-04-01 14:57:14
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-13 01:33:32
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

  @IsNotEmpty()
  address: string;

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
  @IsNotEmpty()
  out_point: {
    index: string;
    tx_hash: string;
  };

  @ApiProperty({
    type: JSON,
    description: 'output',
  })
  @IsNotEmpty()
  output: {
    capacity: string;
    lock: {
      args: string;
      code_hash: string;
      hash_type: string;
    };
    type: string;
  };
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
