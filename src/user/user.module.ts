/*
 * @Author: Aven
 * @Date: 2021-03-31 20:40:38
 * @LastEditors: Aven
 * @LastEditTime: 2021-04-01 22:09:24
 * @Description:
 */
import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IndexerEntity } from '../entity/indexer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([IndexerEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
