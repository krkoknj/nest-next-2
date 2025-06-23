import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({

      }),
      envFilePath: './apps/board/.env',
    }),
    DatabaseModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule { }
