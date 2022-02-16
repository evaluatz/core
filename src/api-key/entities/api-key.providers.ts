import { Connection } from 'typeorm';
import { ApiKey } from './api-key.entity';

export const apiKeyProviders = [
    {
        provide: 'API_KEY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(ApiKey),
        inject: ['DATABASE_CONNECTION'],
    },
];
