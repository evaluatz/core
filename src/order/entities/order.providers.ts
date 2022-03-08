import { OrderSchema } from 'src/order-schema/entities/order-schema.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { Connection } from 'typeorm';
import { Order } from './order.entity';

export const orderProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ORDER_SCHEMA_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderSchema),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'ORDER_STATUS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(OrderStatus),
        inject: ['DATABASE_CONNECTION'],
    },
];
