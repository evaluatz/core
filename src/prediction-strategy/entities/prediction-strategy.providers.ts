import { Prediction } from 'src/prediction/entities/prediction.entity';
import { Connection } from 'typeorm';
import { PredictionStrategy } from './prediction-strategy.entity';

export const predictionStrategyProviders = [
    {
        provide: 'PREDICTION_STRATEGY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PredictionStrategy),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'PREDICTION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Prediction),
        inject: ['DATABASE_CONNECTION'],
    },
];
