import { Test, TestingModule } from '@nestjs/testing';
import { PredictionFeatureService } from './prediction-feature.service';

describe('PredictionFeatureService', () => {
  let service: PredictionFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictionFeatureService],
    }).compile();

    service = module.get<PredictionFeatureService>(PredictionFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
