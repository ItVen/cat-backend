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
import { TxModule } from './tx/tx.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

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
