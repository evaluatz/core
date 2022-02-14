import { Test, TestingModule } from '@nestjs/testing';
import { OrderStrategyService } from './order-strategy.service';

describe('OrderStrategyService', () => {
  let service: OrderStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStrategyService],
    }).compile();

    service = module.get<OrderStrategyService>(OrderStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
