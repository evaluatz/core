import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { predictionProviders } from './entities/prediction.providers';
import { DatabaseModule } from 'src/database/database.module';
import { predictionStrategyProviders } from 'src/prediction-strategy/entities/prediction-strategy.providers';
import { historicProviders } from 'src/historic/entities/historic.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [PredictionController],
    providers: [
        ...predictionProviders,
        PredictionService,
        ...predictionStrategyProviders,
        ...historicProviders,
    ],
})
export class PredictionModule {}
