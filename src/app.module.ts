/*
 * @Author: Aven
 * @Date: 2021-03-30 14:46:17
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-02 21:55:48
 * @Description:
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { BattleEntity } from './entity/battle';
import { BattleStatus } from './entity/battleStatus';
import { CellEntity } from './entity/cell';
import { IndexerEntity } from './entity/indexer';
import { TransferEntity } from './entity/transfer';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CellModule } from './cell/cell.module';
import { TxModule } from './tx/tx.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      // host: process.env.DB_HOST,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      host: '52.82.88.111',
      username: 'cbei_aws',
      password: 'cityU2019',
      database: 'test_ckb',
      entities: [
        BattleEntity,
        BattleStatus,
        CellEntity,
        IndexerEntity,
        TransferEntity,
      ],
      synchronize: true,
      logging: false,
      extra: {
        charset: 'utf8mb4_general_ci',
      },
    }),
    TxModule,
    UserModule,
    CellModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
    console.warn(__dirname);
    console.warn(connection.isConnected ? '数据库连接成功' : '数据库连接失败');
  }
}
