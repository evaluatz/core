import { Connection } from 'typeorm';
import { Historic } from './historic.entity';

export const historicProviders = [
    {
        provide: 'HISTORIC_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Historic),
        inject: ['DATABASE_CONNECTION'],
    },
];
