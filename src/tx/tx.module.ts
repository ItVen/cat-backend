/*
 * @Author: Aven
 * @Date: 2021-03-31 16:52:45
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 22:53:16
 * @Description:
 */
import { Global, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TxService } from './tx.service';
import { TxController } from './tx.controller';
import { MiddlewareConsumer } from '@nestjs/common';
import { TransferEntity } from '../entity/transfer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { BattleEntity } from 'src/entity/battle';
import { BattleService } from 'src/battle/battle.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity, BattleEntity])],
  controllers: [TxController],
  providers: [TxService, BattleService],
  exports: [TxService, BattleService],
})
export class TxModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(TxController);
  }
}
