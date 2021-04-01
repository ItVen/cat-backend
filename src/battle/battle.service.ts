/*
 * @Author: Aven
 * @Date: 2021-04-01 22:47:40
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:18:57
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleEntity } from 'src/entity/battle';
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
  ) {}
  async updateMyTx(transfer: UpdateTransferDataDto): Promise<BattleEntity> {
    let tx = await this.txRepository.findOne({ tx_hash: transfer.txHash });
    if (!tx) return null;
    const newTx = Object.assign(tx, transfer);
    tx = await this.txRepository.save(newTx);
    return tx;
  }

  async pushMyTx(tx: CreateBattleTransferDataDto): Promise<BattleEntity> {
    console.log(tx);
    return null;
  }
}
