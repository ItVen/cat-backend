/*
 * @Author: Aven
 * @Date: 2021-04-01 14:37:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-02 15:43:04
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { CellEntity } from 'src/entity/cell';
import { IndexerEntity } from 'src/entity/indexer';
import { PutUserCellDto } from 'src/user/dto';
import { Repository, getRepository } from 'typeorm';

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
    // todo cell 查询
    // todo 创建 或者更新
    const name = putUserCellDto.data.name;
    // todo 查询cell
    let cell = await this.cellRepository.findOne({ name });
    const newCell = new CellEntity();
    newCell.capacity = putUserCellDto.capacity;
    newCell.data = putUserCellDto.data;
    newCell.lock = putUserCellDto.lock;
    newCell.name = putUserCellDto.data.name;
    newCell.indexer = user;
    if (cell) {
      newCell.indexer = cell.indexer;
      newCell.id = cell.id;
    }
    cell = await this.cellRepository.save(newCell);
    user.cell.push(cell);
    user.create_cat = 0;
    return user;
  }
  getFisherCount(cells: CellEntity[]): number {
    let sum = 0;
    for (const item of cells) {
      sum += item.data.fishes;
    }
    return sum;
  }
  async findOneCat(name: string): Promise<CellEntity> {
    const cell = await this.cellRepository.findOne({ name });
    return cell;
  }
}
