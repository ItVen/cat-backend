/*
 * @Author: Aven
 * @Date: 2021-03-31 16:52:58
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:03:35
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleService } from 'src/battle/battle.service';
import { TransferEntity } from 'src/entity/transfer';
import { Repository } from 'typeorm';
import { CreateTransferDataDto, UpdateTransferDataDto } from './dto';
import { TxType } from './dto/update-tx-statues.dto';

@Injectable()
export class TxService {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly txRepository: Repository<TransferEntity>,
    private readonly battleService: BattleService,
  ) {}

  async pushMyTx(transfer: CreateTransferDataDto): Promise<TransferEntity> {
    let tx = await this.txRepository.findOne({ tx_hash: transfer.txHash });
    if (tx) return tx;
    const newTx = new TransferEntity();
    newTx.from = transfer.from;
    newTx.to = transfer.to;
    newTx.name = transfer.name;
    newTx.tx_hash = transfer.txHash;
    tx = await this.txRepository.save(newTx);
    return tx;
  }

  async updateMyTx(transfer: UpdateTransferDataDto): Promise<TransferEntity> {
    let tx = null;
    if (transfer.tx_type[0] == TxType[0]) {
      let tx = await this.txRepository.findOne({ tx_hash: transfer.txHash });
      if (!tx) return null;
      const newTx = Object.assign(tx, transfer);
      tx = await this.txRepository.save(newTx);
    } else {
      tx = await this.battleService.updateMyTx(transfer);
    }
    return tx;
  }
}
