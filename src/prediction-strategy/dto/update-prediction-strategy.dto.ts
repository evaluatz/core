import { PartialType } from '@nestjs/mapped-types';
import { CreatePredictionStrategyDto } from './create-prediction-strategy.dto';

export class UpdatePredictionStrategyDto extends PartialType(CreatePredictionStrategyDto) {}
