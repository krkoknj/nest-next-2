import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.use(cookieParser());
  app.connectMicroservice(rmqService.getOptions('SEARCH', true));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT') ?? 5004);
}
bootstrap();
