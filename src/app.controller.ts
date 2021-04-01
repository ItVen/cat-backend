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
  @ApiOperation({ description: '查询name下的ntf卡数据' })
  @Get('cat/one')
  getOneNtf(): any {
    // todo 查询name下的ntf卡数据 分享可见 访问权限不强制 获取用户提交的name 或者用的token
    return 'todo 查询name下的ntf卡数据';
  }
}
