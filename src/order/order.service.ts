import { Inject, Injectable } from '@nestjs/common';
import { OrderSchema } from 'src/order-schema/entities/order-schema.entity';
import { OrderSchemaService } from 'src/order-schema/order-schema.service';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepository: Repository<Order>,
        @Inject('ORDER_SCHEMA_REPOSITORY')
        private orderSchemaRepository: Repository<OrderSchema>,
        @Inject('ORDER_STATUS_REPOSITORY')
        private orderStatusRepository: Repository<OrderStatus>,
    ) {}
    async create(createOrderDto: CreateOrderDto) {
        const { isBuy, value, schemaId } = createOrderDto;
        const schema = await this.orderSchemaRepository.findOne(schemaId);
        const status = await this.orderStatusRepository.findOne(8);

        const newOrderSchema = this.orderRepository.create({
            createdAt: new Date(),
            isBuy,
            value,
            schema,
            status,
        });
        return this.orderRepository.save(newOrderSchema);
    }

    findAll() {
        return this.orderRepository.find();
    }

    findOne(id: number) {
        return this.orderRepository.findOne(id);
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const { statusId, belongsToId } = updateOrderDto;
        const status = await this.orderStatusRepository.findOne(statusId || 8);
        return this.orderRepository.save({ id, status, belongsTo: { id: belongsToId } });
    }

    async remove(id: number) {
        const status = await this.orderStatusRepository.findOne(-1);
        return this.orderRepository.save({ id, status });
    }
}
