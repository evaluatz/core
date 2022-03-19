import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import moment from 'moment';
import { Historic } from 'src/historic/entities/historic.entity';
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
        @Inject('HISTORIC_REPOSITORY')
        private historicRepository: Repository<Historic>,
    ) {}

    async create(createPredictionDto: CreatePredictionDto) {
        const { openTime, value, strategyID, secret } = createPredictionDto;
        const strategy = await this.predictionStrategyRepository.findOne({
            where: {
                id: strategyID,
                secret,
            },
            relations: ['symbol'],
        });

        if (!strategy) throw 'StrategyID is wrong..';

        const historic = await this.historicRepository.findOne({
            where: {
                symbol: strategy.symbol,
                openTime,
            },
        });

        if (!historic) throw 'openDate is wrong..';

        const newPrediction = this.predictionRepository.create({
            openTime,
            value,
            strategy,
            historic,
        });
        await this.predictionRepository.save(newPrediction);
        strategy.updated_at = new Date();
        await this.predictionStrategyRepository.save(strategy);
        return true;
    }

    findAll() {
        return this.predictionRepository.find({ relations: ['historic'] });
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
