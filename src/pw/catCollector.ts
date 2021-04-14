/*
 * @Author: Aven
 * @Date: 2021-04-14 13:40:15
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-14 15:42:58
 * @Description: 重写indexerCollector的getSUDTBalance和collectSUDT方法
 */
import {
  Address,
  Amount,
  AmountUnit,
  Cell,
  Collector,
  CollectorOptions,
  OutPoint,
} from '@lay2/pw-core';
import axios from 'axios';
import {
  CkbIndexer,
  HexString,
  IndexerCellToCell,
  Script,
  ScriptType,
  Terminator,
} from './helpers/ckb-indexer';

import { SourlyCatType } from './SourlyCatType';
export class CatCollector extends Collector {
  private indexer: CkbIndexer;
  constructor(public apiBase: string) {
    super();
    this.indexer = new CkbIndexer(apiBase);
  }

  async getBalance(address: Address): Promise<Amount> {
    const searchKey = {
      script: address.toLockScript().serializeJson() as Script,
      script_type: ScriptType.lock,
      filter: {
        output_data_len_range: ['0x0', '0x1'] as [HexString, HexString],
      },
    };
    const cells = (await this.indexer.getCells(searchKey)).filter(
      (cell) => cell.output.type === null,
    );
    let balance = Amount.ZERO;
    cells.forEach((cell) => {
      const amount = new Amount(cell.output.capacity, AmountUnit.shannon);
      balance = balance.add(amount);
    });
    return balance;
  }
  async collect(address: Address, options: CollectorOptions): Promise<Cell[]> {
    if (!options || !options.neededAmount) {
      throw new Error("'neededAmount' in options must be provided");
    }
    let accCapacity = Amount.ZERO;
    const terminator: Terminator = (_index, cell) => {
      if (accCapacity.gte(options.neededAmount)) {
        return { stop: true, push: false };
      }
      if (cell.output_data.length / 2 - 1 > 0 || cell.output.type !== null) {
        return { stop: false, push: false };
      } else {
        accCapacity = accCapacity.add(
          new Amount(cell.output.capacity, AmountUnit.shannon),
        );
        return { stop: false, push: true };
      }
    };
    const searchKey = {
      script: address.toLockScript().serializeJson() as Script,
      script_type: ScriptType.lock,
      filter: {
        output_data_len_range: ['0x0', '0x1'] as [HexString, HexString],
      },
    };
    const cells = await this.indexer.getCells(searchKey, terminator);
    return cells.map((cell) => IndexerCellToCell(cell));
  }

  async getSUDTBalance(sudt: SourlyCatType, address: Address): Promise<Amount> {
    const searchKey = {
      script: address.toLockScript().serializeJson() as Script,
      script_type: ScriptType.lock,
      filter: {
        script: sudt.toTypeScript().serializeJson() as Script,
      },
    };
    const cells = await this.indexer.getCells(searchKey);
    let balance = Amount.ZERO;
    cells.forEach((cell) => {
      const amount = Amount.fromUInt128LE(cell.output_data);
      balance = balance.add(amount);
    });
    return balance;
  }

  async collectSUDT(
    sudt: SourlyCatType,
    address: Address,
    options: CollectorOptions,
  ): Promise<Cell[]> {
    if (!options || !options.neededAmount) {
      throw new Error("'neededAmount' in options must be provided");
    }
    const searchKey = {
      script: address.toLockScript().serializeJson() as Script,
      script_type: ScriptType.lock,
      filter: {
        script: sudt.toTypeScript().serializeJson() as Script,
      },
    };
    let accCapacity = Amount.ZERO;
    const terminator: Terminator = (_index, cell) => {
      if (accCapacity.gte(options.neededAmount)) {
        return { stop: true, push: false };
      }
      accCapacity = accCapacity.add(Amount.fromUInt128LE(cell.output_data));
      return { stop: false, push: true };
    };
    const cells = await this.indexer.getCells(searchKey, terminator);
    return cells.map((cell) => IndexerCellToCell(cell));
  }
}
