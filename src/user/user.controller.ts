/*
 * @Author: Aven
 * @Date: 2021-03-31 20:40:23
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 18:37:22
 * @Description:
 */
import { Query, Req, Request } from '@nestjs/common';
import { Controller, Put, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, QueryNameDto, PutUserCellDto } from './dto/index';
import { UserService } from './user.service';
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '绑定我的账户' })
  @Post()
  createMyIndexer(@Body() createUserDto: CreateUserDto): any {
    return this.userService.createMyIndexer(createUserDto);
  }

  @Get('name')
  getIsNameRepeat(@Query() queryNameDto: QueryNameDto): any {
    return this.userService.findNameUsed(queryNameDto.name);
  }

  @ApiOperation({ description: '更新我的账户' })
  @Put()
  updeteMyIndexer(
    @Req() req: Request,
    @Body() putUserCellDto: PutUserCellDto,
  ): any {
    const user = req['user'];
    return this.userService.putMyCell(putUserCellDto, user);
  }
}
