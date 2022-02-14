import { Module } from '@nestjs/common';
import { OrderStrategyService } from './order-strategy.service';
import { OrderStrategyController } from './order-strategy.controller';

@Module({
  controllers: [OrderStrategyController],
  providers: [OrderStrategyService]
})
export class OrderStrategyModule {}
