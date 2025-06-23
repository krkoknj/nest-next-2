import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { BILLING_SERVICE } from './constants/services';
import { OrderEntity } from './entites/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    // DatabaseModule,
    DatabaseModule.forRoot(),
    DatabaseModule.forFeature([OrderEntity]),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
