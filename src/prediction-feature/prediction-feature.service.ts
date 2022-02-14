import { Injectable } from '@nestjs/common';
import { CreatePredictionFeatureDto } from './dto/create-prediction-feature.dto';
import { UpdatePredictionFeatureDto } from './dto/update-prediction-feature.dto';

@Injectable()
export class PredictionFeatureService {
  create(createPredictionFeatureDto: CreatePredictionFeatureDto) {
    return 'This action adds a new predictionFeature';
  }

  findAll() {
    return `This action returns all predictionFeature`;
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
