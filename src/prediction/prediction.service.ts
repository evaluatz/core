import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PredictionStrategy } from 'src/prediction-strategy/entities/prediction-strategy.entity';
import { Repository } from 'typeorm';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { Prediction } from './entities/prediction.entity';

@Injectable()
export class PredictionService {
    constructor(
        @Inject('PREDICTION_REPOSITORY')
        private predictionRepository: Repository<Prediction>,
        @Inject('PREDICTION_STRATEGY_REPOSITORY')
        private predictionStrategyRepository: Repository<PredictionStrategy>,
    ) {}

    async create(createPredictionDto: CreatePredictionDto) {
        const { openTime, value, strategyID, secret } = createPredictionDto;
        const strategy = await this.predictionStrategyRepository.findOneOrFail({
            id: strategyID,
            secret,
        });
        const newObj = {
            openTime,
            value,
            strategy,
        } as Prediction;

        return this.predictionRepository.save(newObj);
    }

    findAll() {
        return this.predictionRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} prediction`;
    }

    update(id: number, updatePredictionDto: UpdatePredictionDto) {
        return `This action updates a #${id} prediction`;
    }

    remove(id: number) {
        return `This action removes a #${id} prediction`;
    }
}
