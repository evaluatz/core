import { Connection } from 'typeorm';
import { OrderStatus } from './order-status.entity';

export const orderStatusProviders = [
    {
        provide: 'ORDER_STATUS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderStatus),
        inject: ['DATABASE_CONNECTION'],
    },
];
