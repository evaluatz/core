import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusService {
    constructor(
        @Inject('ORDER_STATUS_REPOSITORY')
        private orderStatusRepository: Repository<OrderStatus>,
    ) {}

    findAll() {
        return this.orderStatusRepository.find();
    }

    findOne(id: number) {
        return this.orderStatusRepository.findOneBy({ id });
    }
}
