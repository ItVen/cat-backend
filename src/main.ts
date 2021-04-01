import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as useragent from 'express-useragent';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.SERVER_PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // 白名单模式，必须设置，否则不存在于dto对象中的键值也会被使用
      whitelist: true,
      // forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
        // excludeExtraneousValues: true,
      },
    }),
  );

  app.use(helmet());
  app.use(useragent.express());
  // app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('cat-backend server')
    .setVersion('1.0')
    .setDescription('cat backend api doc') // 文档介绍
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(port);
}
bootstrap();
