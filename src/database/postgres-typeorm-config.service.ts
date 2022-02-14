import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresTypeORMConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: false,
      entities: ['src/**/*.entity.ts'],
      synchronize: true,
      cache: {
        type: 'redis',
        duration: 5000,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        },
      },
    };
  }
}
