/**
 * @name battle_status 战斗状态表
 * @author Aven
 * @Date: 2021-03-31
 * @LastEditors: Aven
 * @LastEditTime: 2021-03-31
 * */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('battle_status')
export class BattleStatus {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({
    type: 'varchar',
    length: 20,
    comment: 'cat名字',
  })
  cat_name: string;

  @Column({
    type: 'varchar',
    length: 250,
    comment: 'ckb地址',
  })
  address: string;

  @Column({
    type: 'int',
    comment: '战前fishes',
  })
  before_fishes: string;

  @Column({
    type: 'int',
    comment: '战后fishes',
  })
  after_fishes: string;

  @Column({
    type: 'varchar',
    length: 250,
    comment: '战前hash',
  })
  before_hash: string;
  @Column({
    type: 'varchar',
    length: 250,
    comment: '战后hash',
  })
  after_hash: string;
}
