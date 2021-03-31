import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { TxService } from './tx.service';
import { TxController } from './tx.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { MiddlewareConsumer } from '@nestjs/common';
import { BattleEntity } from '../entity/battle';
import { TransferEntity } from '../entity/transfer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([BattleEntity, TransferEntity])],
  providers: [TxService],
  controllers: [TxController],
})
export class TxModule {}
//   configure(consumer: MiddlewareConsumer): void {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude({ path: 'tx/ranking', method: RequestMethod.GET })
//       .forRoutes(TxController);
//   }
// }
