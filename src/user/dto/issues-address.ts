/*
 * @Author: Aven
 * @Date: 2021-04-14 11:02:57
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-15 11:54:09
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class IssuesCatDto {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    type: String,
    description: 'hash',
  })
  @IsNotEmpty()
  readonly hash: string;
  @ApiProperty({
    type: String,
    description: 'fishes',
  })
  @IsNotEmpty()
  readonly fishes: string;
  @ApiProperty({
    type: String,
    description: 'output_data',
  })
  @IsNotEmpty()
  readonly output_data: string;
  @ApiProperty({
    type: String,
    description: 'ckb_address',
  })
  @IsNotEmpty()
  readonly ckb_address: string;
}
