import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PredictionFeature } from 'src/prediction-feature/entities/prediction-feature.entity';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePredictionStrategyDto } from './dto/create-prediction-strategy.dto';
import { UpdatePredictionStrategyDto } from './dto/update-prediction-strategy.dto';
import { PredictionStrategy } from './entities/prediction-strategy.entity';
import * as uuid from 'uuid';
@Injectable()
export class PredictionStrategyService {
    constructor(
        @Inject('PREDICTION_STRATEGY_REPOSITORY')
        private predictionStrategyRepository: Repository<PredictionStrategy>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
        @Inject('PREDICTION_FEATURE_REPOSITORY')
        private predictionFeatureRepository: Repository<PredictionFeature>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}

    async create(createPredictionStrategyDto: CreatePredictionStrategyDto) {
        const { name, description, creatorID, symbolID, featureID } = createPredictionStrategyDto;

        const creator = await this.userRepository.findOne({ id: creatorID });
        if (!creator) throw 'Invalid User';

        const symbol = await this.symbolRepository.findOne({ id: symbolID });
        if (!symbol) throw 'Invalid Symbol';

        const feature = await this.predictionFeatureRepository.findOne({ id: featureID });
        if (!feature) throw 'Invalid Feature';

        const newObj = {
            id: uuid.v4(),
            secret: uuid.v4(),
            created_at: new Date(),
            updated_at: new Date(),
            creator,
            symbol,
            feature,
            name,
            description,
        } as PredictionStrategy;
        return this.predictionStrategyRepository.save(newObj);
    }

    async findAll() {
        const predictionStrategies = await this.predictionStrategyRepository.find({
            relations: ['symbol', 'feature'],
        });
        return predictionStrategies.map((ps) => ({
            id: ps.id,
            secret: ps.secret,
            name: ps.name,
            description: ps.description,
            symbol: ps.symbol.name,
            feature: ps.feature.name,
        }));
    }

    async findOne(id: string) {
        const predictionStrategy = await this.predictionStrategyRepository.findOne({
            where: { id },
            relations: ['creator', 'symbol', 'feature', 'predictions'],
        });
        return {
            id: predictionStrategy.id,
            secret: predictionStrategy.secret,
            created_at: predictionStrategy.created_at,
            updated_at: predictionStrategy.updated_at,
            name: predictionStrategy.name,
            description: predictionStrategy.description,
            creator: {
                created_at: predictionStrategy.creator.created_at,
                username: predictionStrategy.creator.username,
                full_name: predictionStrategy.creator.full_name,
                email: predictionStrategy.creator.email,
            },
            symbol: predictionStrategy.symbol.name,
            feature: predictionStrategy.feature.name,
            predictions: predictionStrategy.predictions
                .map((p) => ({
                    openTime: p.openTime,
                    value: p.value,
                }))
                .sort((a, b) => a.openTime.getTime() - b.openTime.getTime()),
        };
    }
}
