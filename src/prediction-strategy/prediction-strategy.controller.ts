import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PredictionStrategyService } from './prediction-strategy.service';
import { CreatePredictionStrategyDto } from './dto/create-prediction-strategy.dto';
import { UpdatePredictionStrategyDto } from './dto/update-prediction-strategy.dto';

@Controller('prediction-strategy')
export class PredictionStrategyController {
  constructor(private readonly predictionStrategyService: PredictionStrategyService) {}

  @Post()
  create(@Body() createPredictionStrategyDto: CreatePredictionStrategyDto) {
    return this.predictionStrategyService.create(createPredictionStrategyDto);
  }

  @Get()
  findAll() {
    return this.predictionStrategyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionStrategyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePredictionStrategyDto: UpdatePredictionStrategyDto) {
    return this.predictionStrategyService.update(+id, updatePredictionStrategyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictionStrategyService.remove(+id);
  }
}
