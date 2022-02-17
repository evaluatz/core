import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { Repository } from 'typeorm';
import { Symbol } from 'src/symbol/entities/symbol.entity';

@Controller('historic')
export class HistoricController {
    constructor(
        private readonly historicService: HistoricService,
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
    ) {}

    // @Post()
    // create() {
    //     return this.historicService.sync();
    // }

    @Get(':symbolName')
    async findOne(@Param('symbolName') name: string) {
        const symbol = await this.symbolRepository.findOne({ where: { name } });
        return this.historicService.findAllWithMetrics(symbol);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateHistoricDto: UpdateHistoricDto) {
    //     return this.historicService.update(+id, updateHistoricDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.historicService.remove(+id);
    // }
}
