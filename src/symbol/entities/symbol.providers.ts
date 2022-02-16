import { Connection } from 'typeorm';
import { Symbol } from './symbol.entity';

export const symbolProviders = [
    {
        provide: 'SYMBOL_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Symbol),
        inject: ['DATABASE_CONNECTION'],
    },
];
