import { User } from 'src/user/entities/user.entity';
import { Connection } from 'typeorm';
import { OrderStrategy } from './order-strategy.entity';

export const orderStrategyProviders = [
    {
        provide: 'ORDER_STRATEGY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderStrategy),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION'],
    },
];
