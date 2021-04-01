/*
 * @Author: Aven
 * @Date: 2021-03-31 16:53:08
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:19:36
 * @Description:
 */
import { Req } from '@nestjs/common';
import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BattleService } from 'src/battle/battle.service';
import {
  CreateTransferDataDto,
  UpdateTransferDataDto,
  CreateBattleTransferDataDto,
} from './dto/index';
import { TxService } from './tx.service';
@ApiTags('交易')
@Controller('tx')
export class TxController {
  constructor(
    private readonly txService: TxService,
    private readonly battleService: BattleService,
  ) {}
  @ApiOperation({ description: '提交我的转账交易' })
  @Post()
  pushMyTx(@Body() transfer: CreateTransferDataDto): any {
    return this.txService.pushMyTx(transfer);
  }
  @ApiOperation({ description: '提交我的战斗交易' })
  @Post('battle')
  pushMyTxBattle(@Body() transfer: CreateBattleTransferDataDto): any {
    // todo
    return this.battleService.pushMyTx(transfer);
  }
  @ApiOperation({ description: '查询排行榜' })
  @Get('ranking')
  getRankingList(): any {
    // todo 查询排行榜 是否需要权限 查询逻辑未定 是否需要分页待定
    return 'todo 查询排行榜';
  }
  @ApiOperation({ description: '更新交易状态' })
  @Patch()
  updateTxStatues(@Body() transfer: UpdateTransferDataDto): any {
    return this.txService.updateMyTx(transfer);
  }
  @ApiOperation({ description: '查询战斗历史' })
  @Get('battle')
  getBattleHistory(): any {
    // todo 查询战斗历史 访问权限验证 获取用户提交的分页数据page
    return 'todo 查询战斗历史';
  }
}
