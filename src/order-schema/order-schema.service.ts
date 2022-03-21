import { Inject, Injectable } from '@nestjs/common';
import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderStrategy } from 'src/order-strategy/entities/order-strategy.entity';
import { PredictionStrategy } from 'src/prediction-strategy/entities/prediction-strategy.entity';
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
        @Inject('PREDICTION_STRATEGY_REPOSITORY')
        private predictionStrategyRepository: Repository<PredictionStrategy>,
    ) {}

    async create(createOrderSchemaDto: CreateOrderSchemaDto) {
        const { quantity, apiKeyId, symbolName, strategyId, lowPredictorID, highPredictorID } =
            createOrderSchemaDto;
        const apiKey = await this.apiKeyRepository.findOneOrFail(apiKeyId);
        const symbol = await this.symbolRepository.findOneOrFail({ name: symbolName });
        const strategy = await this.orderStrategyRepository.findOneOrFail(strategyId);

        const newOrderSchema = this.orderSchemaRepository.create({
            createdAt: new Date(),
            active: false,
            quantity,
            apiKey,
            symbol,
            strategy,
        });

        if (lowPredictorID && highPredictorID) {
            newOrderSchema.lowPredictor = await this.predictionStrategyRepository.findOneOrFail({
                id: lowPredictorID,
            });
            newOrderSchema.highPredictor = await this.predictionStrategyRepository.findOneOrFail({
                id: highPredictorID,
            });
        }
        return this.orderSchemaRepository.save(newOrderSchema);
    }

    findAll() {
        return this.orderSchemaRepository.find();
    }

    async findOne(id: number) {
        const orderSchema = await this.orderSchemaRepository.findOne({
            where: { id },
            relations: ['strategy', 'symbol', 'lowPredictor', 'highPredictor'],
        });

        return !orderSchema
            ? undefined
            : {
                  createdAt: orderSchema.createdAt,
                  active: orderSchema.active,
                  quantity: orderSchema.quantity,
                  symbol: orderSchema.symbol.name,
                  strategy: orderSchema.strategy.name,
                  lowPredictor: orderSchema?.lowPredictor?.id,
                  highPredictor: orderSchema?.highPredictor?.id,
              };
    }

    update(id: number, updateOrderSchemaDto: UpdateOrderSchemaDto) {
        return `This action updates a #${id} orderSchema`;
    }

    remove(id: number) {
        return `This action removes a #${id} orderSchema`;
    }
}
