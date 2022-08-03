import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PredictionFeatureService } from './prediction-feature.service';
import { CreatePredictionFeatureDto } from './dto/create-prediction-feature.dto';
import { UpdatePredictionFeatureDto } from './dto/update-prediction-feature.dto';

@Controller('prediction-feature')
export class PredictionFeatureController {
    constructor(private readonly predictionFeatureService: PredictionFeatureService) {}

    @Post()
    create(@Body() createPredictionFeatureDto: CreatePredictionFeatureDto) {
        return this.predictionFeatureService.create(createPredictionFeatureDto);
    }

    @Get()
    findAll() {
        return this.predictionFeatureService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.predictionFeatureService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePredictionFeatureDto: UpdatePredictionFeatureDto,
    ) {
        return this.predictionFeatureService.update(+id, updatePredictionFeatureDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.predictionFeatureService.remove(+id);
    }
}
