/*
 * @Author: Aven
 * @Date: 2021-03-31 10:40:39
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-12 23:38:07
 * @Description:
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IndexerEntity } from './indexer';
@Entity('cell')
export class CellEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'block_number',
  })
  block_number: string;
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'cat_name',
  })
  name: string;

  @Column('simple-json')
  out_point: {
    index: string;
    tx_hash: string;
  };

  @Column('simple-json')
  output: {
    capacity: string;
    lock: {
      args: string;
      code_hash: string;
      hash_type: string;
    };
    type: string;
  };

  @Column({
    type: 'varchar',
    comment: 'output_data',
  })
  output_data: string;
  @Column({
    type: 'varchar',
    comment: 'tx_index',
  })
  tx_index: string;

  @ManyToOne(() => IndexerEntity, (indexer) => indexer.cell)
  indexer: IndexerEntity;

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
