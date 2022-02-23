import { Connection } from 'typeorm';
import { PredictionFeature } from './prediction-feature.entity';

export const predictionFeatureProviders = [
    {
        provide: 'PREDICTION_FEATURE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PredictionFeature),
        inject: ['DATABASE_CONNECTION'],
    },
];
