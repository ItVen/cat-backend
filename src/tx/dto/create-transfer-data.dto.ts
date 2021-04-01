/*
 * @Author: Aven
 * @Date: 2021-04-01 18:59:59
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:04:50
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateTransferDataDto {
  @ApiProperty({
    type: String,
    description: 'to',
  })
  @IsNotEmpty()
  readonly to: string;
  @ApiProperty({
    type: String,
    description: 'txHash',
  })
  @IsNotEmpty()
  readonly txHash: string;
  @ApiProperty({
    type: String,
    description: 'from',
  })
  @IsNotEmpty()
  readonly from: string;
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    type: String,
    description: 'status',
  })
  readonly status: string;
}
