import { Connection } from 'typeorm';
import { PredictionStrategy } from './prediction-strategy.entity';

export const predictionStrategyProviders = [
    {
        provide: 'PREDICTION_STRATEGY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PredictionStrategy),
        inject: ['DATABASE_CONNECTION'],
    },
];
