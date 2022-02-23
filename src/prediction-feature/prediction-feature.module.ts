import { Module } from '@nestjs/common';
import { PredictionFeatureService } from './prediction-feature.service';
import { PredictionFeatureController } from './prediction-feature.controller';
import { DatabaseModule } from 'src/database/database.module';
import { predictionFeatureProviders } from './entities/prediction-feature.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [PredictionFeatureController],
    providers: [...predictionFeatureProviders, PredictionFeatureService],
})
export class PredictionFeatureModule {}
