import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { HistoricModule } from './historic/historic.module';
import { PredictionModule } from './prediction/prediction.module';
import { PredictionStrategyModule } from './prediction-strategy/prediction-strategy.module';
import { SymbolModule } from './symbol/symbol.module';
import { SourceModule } from './source/source.module';
import { OrderModule } from './order/order.module';
import { OrderStrategyModule } from './order-strategy/order-strategy.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { OrderSchemaModule } from './order-schema/order-schema.module';
import { PredictionFeatureModule } from './prediction-feature/prediction-feature.module';
import { CoinModule } from './coin/coin.module';

@Module({
    imports: [
        UserModule,
        DatabaseModule,
        HistoricModule,
        PredictionModule,
        PredictionStrategyModule,
        SymbolModule,
        SourceModule,
        OrderModule,
        OrderStrategyModule,
        OrderStatusModule,
        ApiKeyModule,
        OrderSchemaModule,
        PredictionFeatureModule,
        CoinModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
