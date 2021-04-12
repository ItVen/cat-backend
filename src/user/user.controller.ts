/*
 * @Author: Aven
 * @Date: 2021-03-31 20:40:23
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-13 01:41:45
 * @Description:
 */
import { Query, Req, Request } from '@nestjs/common';
import { Controller, Put, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CellService } from 'src/cell/cell.service';
import { CreateUserDto, QueryNameDto, PutUserCellDto } from './dto/index';
import { UserService } from './user.service';
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cellService: CellService,
  ) {}

  @ApiOperation({ description: '绑定我的账户' })
  @Post()
  async createMyIndexer(@Body() createUserDto: CreateUserDto): Promise<any> {
    const data = await this.userService.createMyIndexer(createUserDto);
    return {
      success: true,
      code: 200,
      message: '请求绑定我的账户成功',
      data,
    };
  }

  @Get('name')
  async getIsNameRepeat(@Query() queryNameDto: QueryNameDto): Promise<any> {
    const data = await this.userService.findNameUsed(queryNameDto.name);
    console.log(data);
    return {
      success: true,
      code: 200,
      message: '请求成功',
      data,
    };
  }

  @ApiOperation({ description: '更新我的账户' })
  @Put()
  async updeteMyIndexer(
    @Req() req: Request,
    @Body() putUserCellDto: PutUserCellDto,
  ): Promise<any> {
    const user = req['user'];
    console.log(user);
    const data = await this.userService.putMyCell(putUserCellDto, user);
    console.log(data);
    return {
      success: true,
      code: 200,
      message: '更新我的账户成',
      data,
    };
  }

  @ApiOperation({ description: '查询name下的ntf卡数据' })
  @Get('cat')
  async getOneNtf(@Query() queryNameDto: QueryNameDto): Promise<any> {
    const data = await this.cellService.findOneCat(queryNameDto.name);
    return {
      success: true,
      code: 200,
      message: '查询name下的ntf卡数据成功',
      data,
    };
  }

  @ApiOperation({ description: '获取所有活在的cell列表' })
  @Get('list')
  async getCatList(): Promise<any> {
    // todo 排序
    const data = await this.cellService.findAllCat();
    return {
      success: true,
      code: 200,
      message: '获取所有活在的cell列表',
      data,
    };
  }
  @ApiOperation({ description: '查看地址下绑定的cat' })
  @Get('list/user')
  async getUserCatList(
    @Req() req: Request,
    @Query() queryNameDto: QueryNameDto,
  ): Promise<any> {
    // todo 排序
    const data = await this.userService.findUserAllCat(
      queryNameDto.name,
      req.headers['authorization'],
    );
    return {
      success: true,
      code: 200,
      message: '查看地址下绑定的cat',
      data,
    };
  }
}
