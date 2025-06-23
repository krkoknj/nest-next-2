import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 5001);
  console.log(
    `Orders service is running on port ${configService.get('PORT') ?? 5001}`,
  );
}
bootstrap();
