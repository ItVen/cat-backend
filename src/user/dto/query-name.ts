/*
 * @Author: Aven
 * @Date: 2021-04-01 14:27:40
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 18:14:17
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class QueryNameDto {
  @ApiProperty({
    type: String,
    description: 'cat-name',
  })
  @IsNotEmpty()
  readonly name: string;
}
