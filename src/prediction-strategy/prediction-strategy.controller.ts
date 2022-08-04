import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

    @Get('symbol/:symbolName')
    findBySymbol(@Param('symbolName') id: string) {
        return this.predictionStrategyService.findBySymbol(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.predictionStrategyService.findOne(id);
    }

    @Get(':id/historic')
    findHistoric(@Param('id') id: string, @Query() query) {
        const { offset } = query;
        return this.predictionStrategyService.findHistoric(id, offset);
    }
}
