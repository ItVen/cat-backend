/*
 * @Author: Aven
 * @Date: 2021-04-01 14:37:37
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-13 01:38:48
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CellEntity } from 'src/entity/cell';
import { IndexerEntity } from 'src/entity/indexer';
import { PutUserCellDto } from 'src/user/dto';
import { Not, Repository } from 'typeorm';

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
    const name = putUserCellDto.name;
    // todo 查询cell
    let cell = await this.cellRepository.findOne({ name });
    const newCell = new CellEntity();
    newCell.output = putUserCellDto.output;
    newCell.address = putUserCellDto.address;
    newCell.out_point = putUserCellDto.out_point;
    newCell.output_data = putUserCellDto.output_data;
    newCell.tx_index = putUserCellDto.tx_index;
    newCell.name = putUserCellDto.name;
    newCell.block_number = putUserCellDto.block_number;
    newCell.indexer = user;
    if (cell) {
      newCell.indexer = cell.indexer;
      newCell.id = cell.id;
    }
    console.log(cell);

    cell = await this.cellRepository.save(newCell);
    user.cell.push(cell);
    user.create_cat = 0;
    return user;
  }
  getFisherCount(cells: CellEntity[]): number {
    let sum = 0;
    for (const item of cells) {
      const data = JSON.parse(item.output_data);
      sum += data.fishes;
    }
    return sum;
  }
  async findOneCat(name: string): Promise<CellEntity> {
    // 返回小猫的绑定地址的数据
    const cell = await this.cellRepository.findOne({
      select: ['output_data', 'address'],
      where: {
        name,
        output_data: Not('0x'),
      },
    });
    return cell;
  }
  async findAllCat(): Promise<CellEntity[]> {
    // todo 排序
    const cell = await this.cellRepository.find({
      select: ['output_data'],
      where: {
        output_data: Not('0x'),
      },
    });
    // todo 返回列表

    return cell;
  }
}
