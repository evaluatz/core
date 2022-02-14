import { Test, TestingModule } from '@nestjs/testing';
import { PredictionStrategyController } from './prediction-strategy.controller';
import { PredictionStrategyService } from './prediction-strategy.service';

describe('PredictionStrategyController', () => {
  let controller: PredictionStrategyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionStrategyController],
      providers: [PredictionStrategyService],
    }).compile();

    controller = module.get<PredictionStrategyController>(PredictionStrategyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
