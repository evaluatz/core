import { Test, TestingModule } from '@nestjs/testing';
import { PredictionStrategyService } from './prediction-strategy.service';

describe('PredictionStrategyService', () => {
  let service: PredictionStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictionStrategyService],
    }).compile();

    service = module.get<PredictionStrategyService>(PredictionStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
