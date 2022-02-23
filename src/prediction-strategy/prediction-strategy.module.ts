import { Module } from '@nestjs/common';
import { PredictionStrategyService } from './prediction-strategy.service';
import { PredictionStrategyController } from './prediction-strategy.controller';
import { predictionStrategyProviders } from './entities/prediction-strategy.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/entities/user.providers';
import { symbolProviders } from 'src/symbol/entities/symbol.providers';
import { predictionFeatureProviders } from 'src/prediction-feature/entities/prediction-feature.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [PredictionStrategyController],
    providers: [
        ...predictionStrategyProviders,
        PredictionStrategyService,
        ...symbolProviders,
        ...userProviders,
        ...predictionFeatureProviders,
    ],
})
export class PredictionStrategyModule {}
