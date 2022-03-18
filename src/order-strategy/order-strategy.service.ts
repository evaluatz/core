import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderStrategyDto } from './dto/create-order-strategy.dto';
import { OrderStrategy } from './entities/order-strategy.entity';

@Injectable()
export class OrderStrategyService {
    constructor(
        @Inject('ORDER_STRATEGY_REPOSITORY')
        private orderStrategyRepository: Repository<OrderStrategy>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async create(createOrderStrategyDto: CreateOrderStrategyDto) {
        const { name, userId } = createOrderStrategyDto;
        const creator = await this.userRepository.findOne({ id: userId });
        if (!creator) throw 'Invalid User';

        const newOrderStrategy = this.orderStrategyRepository.create({
            name,
            creator,
            createdAt: new Date(),
        });

        return this.orderStrategyRepository.save(newOrderStrategy);
    }

    findAll() {
        return this.orderStrategyRepository.find();
    }

    findOne(id: number) {
        return this.orderStrategyRepository.findOne({ id });
    }
}
