/*
 * @Author: Aven
 * @Date: 2021-03-30 14:46:17
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-02 15:38:48
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('ntf-cat')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({ description: '查询能战斗的cat列表' })
  @Get('cat')
  getNtfList(): any {
    // todo 查询能战斗的cat列表 已登录状态可见 访问权限验证 获取用户提交的分页数据page
    return '查询能战斗的cat列表';
  }
}
