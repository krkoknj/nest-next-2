import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule, RmqModule, User } from '@app/common';
import { Board } from '@app/common/database/entities/board.entity';
import { Comment } from '@app/common/database/entities/comment.entity';
import { SEARCH_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({}),
      envFilePath: './apps/board/.env',
    }),
    DatabaseModule.forRoot(),
    DatabaseModule.forFeature([User, Board, Comment]),
    AuthModule,
    RmqModule.register({
      name: SEARCH_SERVICE,
    }),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
