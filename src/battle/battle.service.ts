/*
 * @Author: Aven
 * @Date: 2021-04-01 22:47:40
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:18:57
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CellService } from 'src/cell/cell.service';
import { BattleEntity } from 'src/entity/battle';
import { StatusService } from 'src/status/status.service';
import {
  UpdateTransferDataDto,
  CreateBattleTransferDataDto,
} from 'src/tx/dto/index';
import { Repository } from 'typeorm';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(BattleEntity)
    private readonly txRepository: Repository<BattleEntity>,
    private readonly statusService: StatusService,
    private readonly cellService: CellService,
  ) {}
  async updateMyTx(transfer: UpdateTransferDataDto): Promise<BattleEntity> {
    let tx = await this.txRepository.findOne({ tx_hash: transfer.txHash });
    if (!tx) return null;
    const newTx = Object.assign(tx, transfer);
    tx = await this.txRepository.save(newTx);
    return tx;
  }

  async pushMyTx(battle: CreateBattleTransferDataDto): Promise<boolean> {
    const tx = await this.txRepository.findOne({ tx_hash: battle.txHash });
    if (tx) return false;
    // todo 创建statue
    const winerState = this.statusService.createState(
      battle.winer,
      battle.afterWiner,
      battle.winnerFishes,
    );
    const loserState = this.statusService.createState(
      battle.loser,
      battle.afterLoser,
      battle.loserFishes,
    );
    const state = await Promise.all([winerState, loserState]);
    const newBattle = new BattleEntity();
    newBattle.names = battle.winer.name + ',' + battle.loser.name;
    newBattle.winner = battle.winer.name;
    newBattle.tx_hash = battle.txHash;
    newBattle.battle_winner = state[0];
    newBattle.battle_loser = state[1];
    await this.txRepository.save(newBattle);
    // todo  交易状态查询更新
    // todo 更新cell数据
    console.log('--------cell state');
    const cell1 = this.cellService.updateOneCat(
      battle.winer,
      battle.afterWiner,
    );
    const cell2 = this.cellService.updateOneCat(
      battle.loser,
      battle.afterLoser,
    );
    await Promise.all([cell1, cell2]);
    return true;
  }
}
