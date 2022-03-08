import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from './entities/order.providers';
import { OrderSchemaService } from 'src/order-schema/order-schema.service';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { orderSchemaProviders } from 'src/order-schema/entities/order-schema.providers';
import { orderStatusProviders } from 'src/order-status/entities/order-status.providers';
import { OrderStatusModule } from 'src/order-status/order-status.module';

@Module({
    imports: [DatabaseModule],
    controllers: [OrderController],
    providers: [...orderProviders, OrderService],
})
export class OrderModule {}
