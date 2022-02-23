import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CreatePredictionFeatureDto } from './dto/create-prediction-feature.dto';
import { UpdatePredictionFeatureDto } from './dto/update-prediction-feature.dto';
import { PredictionFeature } from './entities/prediction-feature.entity';

@Injectable()
export class PredictionFeatureService {
    private cachedTblName: string = 'tbl.predictionFeature';
    constructor(
        @Inject('PREDICTION_FEATURE_REPOSITORY')
        private predictionFeatureRepository: Repository<PredictionFeature>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}

    create(createPredictionFeatureDto: CreatePredictionFeatureDto) {
        const newObj = {
            name: createPredictionFeatureDto.name,
        } as PredictionFeature;
        return; //this.predictionFeatureRepository.save(newObj);
    }

    async findAll() {
        const cachedData = await this.cacheManager.get(this.cachedTblName);
        if (cachedData) return cachedData;

        const dataDB = await this.predictionFeatureRepository.find();
        this.cacheManager.set(this.cachedTblName, dataDB, {
            ttl: 900,
        });
        return dataDB;
    }

    findOne(id: number) {
        return `This action returns a #${id} predictionFeature`;
    }

    update(id: number, updatePredictionFeatureDto: UpdatePredictionFeatureDto) {
        return `This action updates a #${id} predictionFeature`;
    }

    remove(id: number) {
        return `This action removes a #${id} predictionFeature`;
    }
}
