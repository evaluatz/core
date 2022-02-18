import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                type: 'postgres',
                port: 5432,
                host: process.env.DB_HOST,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                logging: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
                cache: {
                    type: 'redis',
                    duration: 5000,

                    options: {
                        url: `redis://${process.env.REDIS_URL || 'localhost:6379'}`,
                    },
                },
            }),
    },
];
