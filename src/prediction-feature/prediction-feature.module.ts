import { Module } from '@nestjs/common';
import { PredictionFeatureService } from './prediction-feature.service';
import { PredictionFeatureController } from './prediction-feature.controller';

@Module({
  controllers: [PredictionFeatureController],
  providers: [PredictionFeatureService]
})
export class PredictionFeatureModule {}
