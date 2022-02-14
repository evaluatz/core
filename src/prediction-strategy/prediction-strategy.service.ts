import { Injectable } from '@nestjs/common';
import { CreatePredictionStrategyDto } from './dto/create-prediction-strategy.dto';
import { UpdatePredictionStrategyDto } from './dto/update-prediction-strategy.dto';

@Injectable()
export class PredictionStrategyService {
  create(createPredictionStrategyDto: CreatePredictionStrategyDto) {
    return 'This action adds a new predictionStrategy';
  }

  findAll() {
    return `This action returns all predictionStrategy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predictionStrategy`;
  }

  update(id: number, updatePredictionStrategyDto: UpdatePredictionStrategyDto) {
    return `This action updates a #${id} predictionStrategy`;
  }

  remove(id: number) {
    return `This action removes a #${id} predictionStrategy`;
  }
}
