/**
 * @name cell cell表
 * @author Aven
 * @Date: 2021-03-31
 * @LastEditors: Aven
 * @LastEditTime: 2021-03-31
 * */

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
    comment: 'capacity',
  })
  capacity: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    comment: 'lock',
  })
  lock: string;

  @Column('simple-json')
  data: {
    name: string;
    fishes: number;
    hash: string;
  };

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
