/*
 * @Author: Aven
 * @Date: 2021-04-01 14:37:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-20 17:33:14
 * @Description:
 */
import { Address, AddressType, Amount, SUDT } from '@lay2/pw-core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CellEntity } from 'src/entity/cell';
import { IndexerEntity } from 'src/entity/indexer';
import { SourlyCatType } from 'src/pw/SourlyCatType';
import { NTFCat } from 'src/tx/dto/create-battle-transfer-data.dto';
import { PutUserCellDto, IssuesCatDto } from 'src/user/dto';
import { Not, Repository } from 'typeorm';
import { InitPw } from '../pw/initPw';

@Injectable()
export class CellService {
  constructor(
    @InjectRepository(CellEntity)
    private readonly cellRepository: Repository<CellEntity>,
  ) {}
  async findNameUsed(name: string): Promise<boolean> {
    const cell = await this.cellRepository.findOne({ name });
    if (cell) return true;
    return false;
  }
  async createOrUpdateCellData(
    putUserCellDto: PutUserCellDto,
    user: IndexerEntity,
  ): Promise<IndexerEntity> {
    const name = putUserCellDto.name;
    let cell = await this.cellRepository.findOne({ name });
    const newCell = new CellEntity();
    newCell.output = putUserCellDto.output;
    newCell.address = putUserCellDto.address;
    newCell.out_point = putUserCellDto.out_point;
    newCell.output_data = putUserCellDto.output_data;
    newCell.userdata = putUserCellDto.userdata;
    newCell.tx_index = putUserCellDto.tx_index;
    newCell.name = putUserCellDto.name;
    newCell.block_number = putUserCellDto.block_number;
    newCell.indexer = user;
    if (cell) {
      newCell.indexer = cell.indexer;
      newCell.id = cell.id;
    }
    cell = await this.cellRepository.save(newCell);
    // user.cell.push(cell);
    user.create_cat = 0;
    return user;
  }
  getFisherCount(cells: CellEntity[]): number {
    let sum = 0;
    for (const item of cells) {
      const data = JSON.parse(item.userdata);
      sum += data.fishes;
    }
    return sum;
  }
  async findOneCat(name?: string, mine?: IndexerEntity): Promise<CellEntity> {
    // ????????????????????????????????????
    let where;
    if (!name || name == '??????') {
      where = {
        indexer: Not(mine.id),
      };
    } else {
      where = {
        name,
      };
    }
    console.log(where);
    const cell = await this.cellRepository.findOne({
      select: ['output', 'output_data', 'userdata', 'address', 'name'],
      where,
    });
    return cell;
  }

  async findMineCat(mine?: IndexerEntity): Promise<CellEntity> {
    // ????????????????????????????????????
    const where = {
      indexer: mine.id,
    };
    console.log(where, 'where');
    const cell = await this.cellRepository.findOne({
      select: ['output', 'output_data', 'userdata', 'address', 'name'],
      where,
    });
    console.log(cell, 'cell');
    return cell;
  }

  async updateOneCat(before: NTFCat, after: NTFCat) {
    // ????????????????????????????????????
    const cell = await this.cellRepository.findOne({
      name: before.name,
    });
    cell.userdata = JSON.stringify({
      name: cell.name,
      fishes: after.fishes,
      hash: after.hash,
    });
    await this.cellRepository.save(cell);
  }

  async findAllCat(): Promise<CellEntity[]> {
    // todo ??????
    const cell = await this.cellRepository.find({
      select: ['userdata'],
      where: {
        // output_data: Not('0x'),
      },
    });
    // todo ????????????
    return cell;
  }

  async issuseCat(user: string, cat: IssuesCatDto) {
    const address = new Address(user, AddressType.ckb);
    const amount = new Amount('1');
    const sudt = new SourlyCatType(
      '0x9ec9ae72e4579980e41554100f1219ff97599f8ab7e79c074b30f2fa241a790c',
    );
    // todo ????????????
    console.log(cat);
    const pw = new InitPw();
    await pw.getInit(address, sudt);
    let txHash;
    try {
      txHash = await pw.sendTransaction(sudt, address, amount, cat);
      console.log(txHash);
      // todo ??????????????????
    } catch (e) {
      // todo ??????????????????
      return false;
    }
    return txHash;
  }
  async updateCellDeaed(indexer) {
    // cell dead
    await this.cellRepository.delete({ indexer });
  }
}
