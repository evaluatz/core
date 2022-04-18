import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderStrategy } from 'src/order-strategy/entities/order-strategy.entity';
import { Order } from 'src/order/entities/order.entity';
import { PredictionStrategy } from 'src/prediction-strategy/entities/prediction-strategy.entity';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Connection } from 'typeorm';
import { OrderSchema } from './order-schema.entity';

export const orderSchemaProviders = [
    {
        provide: 'ORDER_SCHEMA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'API_KEY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ApiKey),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'SYMBOL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Symbol),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ORDER_STRATEGY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderStrategy),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PREDICTION_STRATEGY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PredictionStrategy),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: ['DATABASE_CONNECTION'],
    },
];
