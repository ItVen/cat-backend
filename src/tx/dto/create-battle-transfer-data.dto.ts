/*
 * @Author: Aven
 * @Date: 2021-04-01 18:59:59
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:15:15
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BattleStatus } from './battle-status-data.dto';
export class CreateBattleTransferDataDto {
  @ApiProperty({
    type: String,
    description: 'names',
  })
  @IsNotEmpty()
  names: string;

  @ApiProperty({
    type: String,
    description: 'winner',
  })
  @IsNotEmpty()
  winner: string;

  @ApiProperty({
    type: String,
    description: 'tx_hash',
  })
  @IsNotEmpty()
  tx_hash: string;
  @ApiProperty({
    type: Object,
    description: 'battle_started',
  })
  @IsNotEmpty()
  battle_started: BattleStatus;

  @ApiProperty({
    type: Object,
    description: 'battle_accept',
  })
  @IsNotEmpty()
  battle_accept: BattleStatus;
}
