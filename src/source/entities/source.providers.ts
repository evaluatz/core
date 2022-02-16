import { Connection } from 'typeorm';
import { Source } from './source.entity';

export const sourceProviders = [
    {
        provide: 'SOURCE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Source),
        inject: ['DATABASE_CONNECTION'],
    },
];
