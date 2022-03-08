import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { orderStatusProviders } from './entities/order-status.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [OrderStatusController],
    providers: [...orderStatusProviders, OrderStatusService],
})
export class OrderStatusModule {}
