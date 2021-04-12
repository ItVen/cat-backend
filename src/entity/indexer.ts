/*
 * @Author: Aven
 * @Date: 2021-03-31 10:43:34
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 16:41:33
 * @Description:
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CellEntity } from './cell';
@Entity('indexer')
export class IndexerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '邮箱地址',
    default: 'test',
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 50,
    unique: false,
    comment: 'eth address',
  })
  ethAddress: string;
  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    comment: 'ckb地址',
  })
  address: string;

  @Column({
    type: 'tinyint',
    comment: '是否可以添加ntf',
    default: 1,
  })
  create_cat: number;

  @OneToMany(() => CellEntity, (cell) => cell.indexer)
  cell: CellEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  createdTime: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '更新时间',
  })
  updatedTime: Date;
}
