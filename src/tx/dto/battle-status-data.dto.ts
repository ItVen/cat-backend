/*
 * @Author: Aven
 * @Date: 2021-04-01 18:59:59
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:11:39
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export enum TxType {
  'transfer',
  'battle',
}

export class BattleStatus {
  @ApiProperty({
    type: String,
    description: 'cat_name',
  })
  @IsNotEmpty()
  cat_name: string;
  @ApiProperty({
    type: String,
    description: 'address',
  })
  @IsNotEmpty()
  address: string;
  @ApiProperty({
    type: String,
    description: 'before_fishes',
  })
  @IsNotEmpty()
  before_fishes: string;
  @ApiProperty({
    type: String,
    description: 'after_fishes',
  })
  @IsNotEmpty()
  after_fishes: string;
  @ApiProperty({
    type: String,
    description: 'before_hash',
  })
  @IsNotEmpty()
  before_hash: string;
  @ApiProperty({
    type: String,
    description: 'after_hash',
  })
  @IsNotEmpty()
  after_hash: string;
}
