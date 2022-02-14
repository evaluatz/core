import { Test, TestingModule } from '@nestjs/testing';
import { OrderStrategyController } from './order-strategy.controller';
import { OrderStrategyService } from './order-strategy.service';

describe('OrderStrategyController', () => {
  let controller: OrderStrategyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderStrategyController],
      providers: [OrderStrategyService],
    }).compile();

    controller = module.get<OrderStrategyController>(OrderStrategyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
