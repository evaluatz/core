import { PartialType } from '@nestjs/mapped-types';
import { CreatePredictionFeatureDto } from './create-prediction-feature.dto';

export class UpdatePredictionFeatureDto extends PartialType(CreatePredictionFeatureDto) {}
