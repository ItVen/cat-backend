/*
 * @Author: Aven
 * @Date: 2021-04-01 18:59:59
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 00:02:21
 * @Description:
 */
import { Cell } from '@lay2/pw-core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BattleStatus, TxType } from './battle-status-data.dto';
export interface NTFCat {
  name: string;
  hash: string;
  address: string;
  fishes: string;
  mine: string;
  output: Cell;
}
export class CreateBattleTransferDataDto {
  @ApiProperty({
    type: Object,
    description: '战斗前winer',
  })
  @IsNotEmpty()
  winer: NTFCat;

  @ApiProperty({
    type: Object,
    description: '战斗前后Winer对象',
  })
  @IsNotEmpty()
  afterWiner: NTFCat;

  @ApiProperty({
    type: Object,
    description: '战斗前loser',
  })
  @IsNotEmpty()
  loser: NTFCat;
  @ApiProperty({
    type: Object,
    description: '战斗后Loser对象',
  })
  @IsNotEmpty()
  afterLoser: NTFCat;

  @ApiProperty({
    type: String,
    description: '失败者失去的小鱼干',
  })
  @IsNotEmpty()
  loserFishes: string;

  @ApiProperty({
    type: String,
    description: '战胜者获得的小鱼干',
  })
  @IsNotEmpty()
  winnerFishes: string;
  @ApiProperty({
    type: String,
    description: '战斗发起者',
  })
  @IsNotEmpty()
  start: string;

  @ApiProperty({
    type: String,
    description: 'txHash',
  })
  @IsNotEmpty()
  txHash: string;
}
