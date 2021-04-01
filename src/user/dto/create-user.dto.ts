import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: '邮箱',
  })
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({
    type: String,
    description: 'ckb账户地址',
  })
  @IsNotEmpty()
  readonly address: string;
}
