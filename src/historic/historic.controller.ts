import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    CACHE_MANAGER,
} from '@nestjs/common';
import { HistoricService } from './historic.service';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { Repository } from 'typeorm';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Cache } from 'cache-manager';

@Controller('historic')
export class HistoricController {
    constructor(
        private readonly historicService: HistoricService,
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}

    @Post()
    create() {
        return this.historicService.sync();
    }

    @Get(':symbolName')
    async findOne(@Param('symbolName') name: string) {
        const histCached = await this.cacheManager.get(`historic_${name}`);
        if (histCached) return histCached;

        const symbol = await this.symbolRepository.findOne({ where: { name } });
        await this.historicService.updateAllWithMetrics(symbol);
        return await this.cacheManager.get(`historic_${name}`);
    }
}
