/*
 * @Author: Aven
 * @Date: 2021-03-31 16:53:08
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-16 00:24:42
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
  async pushMyTx(@Body() transfer: CreateTransferDataDto): Promise<any> {
    const data = await this.txService.pushMyTx(transfer);
    return {
      success: true,
      code: 200,
      message: '请求提交我的转账交易成功',
      data,
    };
  }
  @ApiOperation({ description: '提交我的战斗交易' })
  @Post('battle')
  async pushMyTxBattle(
    @Body() transfer: CreateBattleTransferDataDto,
  ): Promise<any> {
    const data = await this.battleService.pushMyTx(transfer);
    return {
      success: true,
      code: 200,
      message: '请求提交我的战斗交易成功',
      data,
    };
  }
  @ApiOperation({ description: '查询排行榜' })
  @Get('ranking')
  async getRankingList(): Promise<any> {
    // todo 查询排行榜 是否需要权限 查询逻辑未定 是否需要分页待定
    return 'todo 查询排行榜';
  }
  @ApiOperation({ description: '更新交易状态' })
  @Patch()
  async updateTxStatues(@Body() transfer: UpdateTransferDataDto): Promise<any> {
    const data = await this.txService.updateMyTx(transfer);
    return {
      success: true,
      code: 200,
      message: '请求更新交易状态成功',
      data,
    };
  }
  @ApiOperation({ description: '查询战斗历史' })
  @Get('battle')
  async getBattleHistory(): Promise<any> {
    // todo 查询战斗历史 访问权限验证 获取用户提交的分页数据page
    return 'todo 查询战斗历史';
  }
}
