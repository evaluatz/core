import { Test, TestingModule } from '@nestjs/testing';
import { PredictionFeatureController } from './prediction-feature.controller';
import { PredictionFeatureService } from './prediction-feature.service';

describe('PredictionFeatureController', () => {
  let controller: PredictionFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionFeatureController],
      providers: [PredictionFeatureService],
    }).compile();

    controller = module.get<PredictionFeatureController>(PredictionFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
