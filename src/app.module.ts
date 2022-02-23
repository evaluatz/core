import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { ApiKeyModule } from './api-key/api-key.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
import { CoinModule } from './coin/coin.module';
import { DatabaseModule } from './database/database.module';
import { HistoricModule } from './historic/historic.module';
import { OrderSchemaModule } from './order-schema/order-schema.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { OrderStrategyModule } from './order-strategy/order-strategy.module';
import { OrderModule } from './order/order.module';
import { PredictionFeatureModule } from './prediction-feature/prediction-feature.module';
import { PredictionStrategyModule } from './prediction-strategy/prediction-strategy.module';
import { PredictionModule } from './prediction/prediction.module';
import { SourceModule } from './source/source.module';
import { SymbolModule } from './symbol/symbol.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        CacheModule.register<RedisClientOptions>({
            url: `redis://${process.env.REDIS_URL || 'localhost:6379'}`,
            store: redisStore,
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        UserModule,
        DatabaseModule,
        HistoricModule,
        PredictionModule,
        PredictionFeatureModule,
        PredictionStrategyModule,
        SymbolModule,
        SourceModule,
        OrderModule,
        OrderStrategyModule,
        OrderStatusModule,
        ApiKeyModule,
        OrderSchemaModule,
        CoinModule,
        BinanceModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
