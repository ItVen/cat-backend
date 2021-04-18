/*
 * @Author: Aven
 * @Date: 2021-04-01 14:27:40
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-18 16:41:27
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
export class QueryNameDto {
  @ApiProperty({
    type: String,
    description: 'cat-name',
  })
  readonly name: string;
}
