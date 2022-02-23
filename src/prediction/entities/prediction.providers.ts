import { Connection } from 'typeorm';
import { Prediction } from './prediction.entity';

export const predictionProviders = [
    {
        provide: 'PREDICTION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Prediction),
        inject: ['DATABASE_CONNECTION'],
    },
];
