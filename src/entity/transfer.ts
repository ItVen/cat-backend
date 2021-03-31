/**
 * @name transfer 转账交易表
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
} from 'typeorm';

import { Status } from './battle';

@Entity('transfer')
export class TransferEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    comment: '转账接受地址',
  })
  to: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    comment: '转账发起地址',
  })
  from: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: 'cat名字',
  })
  address: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
    comment: '战斗状态',
  })
  status: Status;

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
