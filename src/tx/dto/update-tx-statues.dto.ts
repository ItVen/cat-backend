/*
 * @Author: Aven
 * @Date: 2021-04-01 18:59:59
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 22:44:28
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export enum TxType {
  'transfer',
  'battle',
}
export class UpdateTransferDataDto {
  @ApiProperty({
    type: String,
    description: 'txHash',
  })
  @IsNotEmpty()
  readonly txHash: string;
  @ApiProperty({
    type: String,
    description: 'status',
  })
  @IsNotEmpty()
  readonly status: string;
  @ApiProperty({
    type: String,
    description: 'tx_type',
  })
  @IsNotEmpty()
  readonly tx_type: TxType;
}
