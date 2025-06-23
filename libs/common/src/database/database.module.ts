// import { Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';

import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
const COMMON_ENTITIES = [UserEntity];

@Module({})
export class DatabaseModule {
  /** 전역 TypeORM 기본 설정 (DB 커넥션) */
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            type: 'mysql',
            url: config.get<string>('DATABASE_URL'),
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }

  /**
   * 개별 모듈에서 사용할 Entity(들)를 등록
   * forFeature로 등록된 Repository를 하위 모듈에서 주입 가능
   */
  static forFeature(entities: Function[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature([...entities])],
      exports: [TypeOrmModule],
    };
  }
}
