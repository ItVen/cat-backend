import { Controller, Put, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('name')
  getIsNameRepeat(): any {
    // todo 查询昵称是否重复 获取用户提交的待确认name 已登录状态 访问权限验证
    return 'todo 查询昵称是否重复';
  }
  @Post()
  createMyIndexer(): any {
    // todo 创建 indexer 绑定我的账户 获取用户提交待绑定的body数据 未登录状态 不需要权限
    return 'todo 创建 indexer 绑定我的账户';
  }

  @Put()
  updeteMyIndexer(): any {
    // todo 更新 indexer  获取用户提交待绑定的body数据 访问权限验证
    return 'todo 更新 indexer';
  }
}
