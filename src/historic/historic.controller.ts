import { CACHE_MANAGER, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Repository } from 'typeorm';
import { HistoricService, IHistoricDataCached } from './historic.service';

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
    async findOne(@Param('symbolName') name: string, @Query() query) {
        const res = {} as IHistoricDataCached;
        const { offset } = query;
        let histCached = (await this.cacheManager.get(`historic_${name}`)) as IHistoricDataCached;
        if (!histCached) {
            const symbol = await this.symbolRepository.findOne({ where: { name } });
            await this.historicService.updateAllWithMetrics(symbol);
            histCached = (await this.cacheManager.get(`historic_${name}`)) as IHistoricDataCached;
        }

        res.headers = histCached.headers;
        res.data = offset ? histCached.data.slice(-offset) : histCached.data;
        return res;
    }
}
