import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, RmqModule } from '@app/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({}),
      envFilePath: './apps/search/.env',
    }),
    RmqModule,
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
      maxRetries: 3,
      requestTimeout: 30000,
      sniffOnStart: true,
      enableMetaHeader: false,
    }),
    AuthModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
