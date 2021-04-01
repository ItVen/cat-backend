/*
 * @Author: Aven
 * @Date: 2021-03-31 10:41:15
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 23:13:44
 * @Description:
 */
/**
 * @name battle 战斗表
 * @author Aven
 * @Date: 2021-03-31
 * @LastEditors: Aven
 * @LastEditTime: 2021-03-31
 * */
export enum Status {
  SUCCESS = 'success',
  PENDING = 'pending',
  FAIL = 'fail',
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { BattleStatus } from './battleStatus';

@Entity('battle')
export class BattleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'simple-array',
    comment: '双方战斗名字',
  })
  names: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '战斗胜利方名字',
  })
  winner: string;

  @Column({
    type: 'varchar',
    length: 250,
    comment: '交易hash',
  })
  tx_hash: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
    comment: '战斗状态',
  })
  status: Status;

  @OneToOne(() => BattleStatus)
  @JoinColumn() // 战斗发起
  battle_started: BattleStatus;

  @OneToOne(() => BattleStatus)
  @JoinColumn() // 战斗接受
  battle_accept: BattleStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '交易发起时间',
  })
  createdTime: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '交易状态更新时间',
  })
  updatedTime: Date;
}
