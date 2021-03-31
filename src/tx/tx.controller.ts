import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('tx')
export class TxController {
  @Post()
  pushMyTx(): any {
    // todo 提交我的交易 获取用户提交的交易对象
    return 'todo 提交我的交易';
  }

  @Get('ranking')
  getRankingList(): any {
    // todo 查询排行榜 是否需要权限 查询逻辑未定 是否需要分页待定
    return 'todo 查询排行榜';
  }
  @Patch()
  updateTxStatues(): any {
    // todo 返回交易状态 访问权限验证
    return 'todo 返回交易状态';
  }
  @Get('battle')
  getBattleHistory(): any {
    // todo 查询战斗历史 访问权限验证 获取用户提交的分页数据page
    return 'todo 查询战斗历史';
  }
}
