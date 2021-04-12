/*
 * @Author: Aven
 * @Date: 2021-04-01 10:49:35
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 16:33:16
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: '邮箱',
  })
  // @IsNotEmpty()
  readonly email: string;
  @ApiProperty({
    type: String,
    description: 'ethAddress',
  })
  @IsNotEmpty()
  readonly ethAddress: string;
  @ApiProperty({
    type: String,
    description: 'ckb账户地址',
  })
  @IsNotEmpty()
  readonly address: string;
}
