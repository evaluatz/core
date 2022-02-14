import { Module } from '@nestjs/common';
import { PredictionStrategyService } from './prediction-strategy.service';
import { PredictionStrategyController } from './prediction-strategy.controller';

@Module({
  controllers: [PredictionStrategyController],
  providers: [PredictionStrategyService]
})
export class PredictionStrategyModule {}
