import { Inject, Injectable } from '@nestjs/common';
import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderStrategy } from 'src/order-strategy/entities/order-strategy.entity';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Repository } from 'typeorm';
import { CreateOrderSchemaDto } from './dto/create-order-schema.dto';
import { UpdateOrderSchemaDto } from './dto/update-order-schema.dto';
import { OrderSchema } from './entities/order-schema.entity';

@Injectable()
export class OrderSchemaService {
    constructor(
        @Inject('ORDER_SCHEMA_REPOSITORY')
        private orderSchemaRepository: Repository<OrderSchema>,
        @Inject('API_KEY_REPOSITORY')
        private apiKeyRepository: Repository<ApiKey>,
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
        @Inject('ORDER_STRATEGY_REPOSITORY')
        private orderStrategyRepository: Repository<OrderStrategy>,
    ) {}

    async create(createOrderSchemaDto: CreateOrderSchemaDto) {
        const { quantity, apiKeyId, symbolName, strategyId } = createOrderSchemaDto;
        const apiKey = await this.apiKeyRepository.findOne(apiKeyId);
        const symbol = await this.symbolRepository.findOne({ name: symbolName });
        const strategy = await this.orderStrategyRepository.findOne(strategyId);

        const newOrderSchema = this.orderSchemaRepository.create({
            createdAt: new Date(),
            active: false,
            quantity,
            apiKey,
            symbol,
            strategy,
        });
        return this.orderSchemaRepository.save(newOrderSchema);
    }

    findAll() {
        return this.orderSchemaRepository.find();
    }

    findOne(id: number) {
        return this.orderSchemaRepository.findOne({ id });
    }

    update(id: number, updateOrderSchemaDto: UpdateOrderSchemaDto) {
        return `This action updates a #${id} orderSchema`;
    }

    remove(id: number) {
        return `This action removes a #${id} orderSchema`;
    }
}
