/*
 * @Author: Aven
 * @Date: 2021-04-01 14:40:09
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 15:15:16
 * @Description:
 */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CellEntity } from 'src/entity/cell';
import { CellService } from './cell.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CellEntity])],
  providers: [CellService],
  exports: [CellService],
})
export class CellModule {}
