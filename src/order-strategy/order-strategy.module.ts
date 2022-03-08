import { Module } from '@nestjs/common';
import { OrderStrategyService } from './order-strategy.service';
import { OrderStrategyController } from './order-strategy.controller';
import { orderStrategyProviders } from './entities/order-strategy.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [OrderStrategyController],
    providers: [...orderStrategyProviders, OrderStrategyService],
})
export class OrderStrategyModule {}
