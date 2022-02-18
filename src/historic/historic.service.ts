import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Repository } from 'typeorm';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { Historic } from './entities/historic.entity';
import * as techIndicators from 'technicalindicators';
import * as moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';

@Injectable()
export class HistoricService {
    constructor(
        @Inject('HISTORIC_REPOSITORY')
        private historicRepository: Repository<Historic>,
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
        @Inject('BINANCE_CONNECTION')
        private binanceClient: any,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {}
    create(createHistoricDto: CreateHistoricDto) {
        return 'This action adds a new historic';
    }

    findAll() {
        return this.historicRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} historic`;
    }

    update(id: number, updateHistoricDto: UpdateHistoricDto) {
        return `This action updates a #${id} historic`;
    }

    remove(id: number) {
        return `This action removes a #${id} historic`;
    }

    async findAllWithMetrics(symbol: Symbol) {
        const historicData = await this.historicRepository.find({
            order: { openTime: 'ASC' },
            where: { symbol },
        });
        const historicDataCross = {
            open: [],
            high: [],
            low: [],
            close: [],
            volume: [],
        };
        historicData.forEach((h) => {
            historicDataCross.open.push(+h.open);
            historicDataCross.high.push(+h.high);
            historicDataCross.low.push(+h.low);
            historicDataCross.close.push(+h.close);
            historicDataCross.volume.push(+h.volume);
        });

        const length_values = historicData.length;

        const RSI_promise = (async () => {
            const arr = techIndicators.RSI.calculate({
                values: historicDataCross.open,
                period: 14,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();

        const ROC_promise = (async () => {
            const arr = techIndicators.ROC.calculate({
                values: historicDataCross.open,
                period: 14,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();

        const ADX_promise = (async () => {
            const arr = techIndicators.ADX.calculate({
                close: historicDataCross.close,
                high: historicDataCross.high,
                low: historicDataCross.low,
                period: 14,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();

        const ADL_promise = (async () => {
            const arr = techIndicators.ADL.calculate({
                close: historicDataCross.close,
                high: historicDataCross.high,
                low: historicDataCross.low,
                volume: historicDataCross.volume,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();

        const MA50_promise = (async () => {
            const arr = techIndicators.SMA.calculate({
                values: historicDataCross.open,
                period: 50,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();

        const MA100_promise = (async () => {
            const arr = techIndicators.SMA.calculate({
                values: historicDataCross.open,
                period: 100,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();
        const MA200_promise = (async () => {
            const arr = techIndicators.SMA.calculate({
                values: historicDataCross.open,
                period: 200,
            });
            arr.unshift(...Array(length_values - arr.length));
            return arr;
        })();

        const [
            RSI_values,
            ROC_values,
            ADX_values,
            ADL_values,
            MA50_values,
            MA100_values,
            MA200_values,
        ] = await Promise.all([
            RSI_promise,
            ROC_promise,
            ADX_promise,
            ADL_promise,
            MA50_promise,
            MA100_promise,
            MA200_promise,
        ]);
        let histAnalysis = [];
        for (let i = 0; i < historicData.length; i++) {
            histAnalysis.push({
                id: historicData[i].openTime,
                open: +historicData[i].open,
                high: +historicData[i].high,
                low: +historicData[i].low,
                ma50: MA50_values[i],
                ma100: MA100_values[i],
                ma200: MA200_values[i],
                rsi14: RSI_values[i],
                roc14: ROC_values[i],
                adx14: ADX_values[i]?.adx,
                mdi14: ADX_values[i]?.mdi,
                pdi14: ADX_values[i]?.pdi,
                adl: ADL_values[i],
            });
        }

        return histAnalysis;
    }
    @Cron(CronExpression.EVERY_30_SECONDS)
    async sync() {
        const symbols = await this.symbolRepository.find({ where: { active: true } });
        return await Promise.all(
            symbols.map(async (symbol) => {
                const cacheKey = `historic_${symbol.name}`;
                const nextUpdate = moment(symbol.lastUpdate).add(15, 'minutes').toDate();

                if (nextUpdate > new Date()) return;
                const options = {
                    startTime: +nextUpdate.getTime(),
                    limit: 1000,
                };

                const klines = await this.binanceClient
                    .klines(symbol.name, '15m', options)
                    .then(({ data }) => data);

                if (!klines || klines.length === 0) {
                    console.log(new Date(), 'Nothing to update: ', symbol.name);
                    return;
                }

                const historicData: Historic[] = await Promise.all(
                    klines.map(
                        async (d) =>
                            ({
                                symbol: symbol,
                                openTime: new Date(d[0]),
                                open: +d[1],
                                high: +d[2],
                                low: +d[3],
                                close: +d[4],
                                volume: +d[5],
                                closeTime: new Date(d[6]),
                                integrityID: `${symbol.name}[${d[0]}]`,
                            } as Historic),
                    ),
                );
                const historicUpdated = await this.historicRepository.save(historicData);
                const historicWithMetrics = await this.findAllWithMetrics(symbol);
                await this.cacheManager.set(cacheKey, historicWithMetrics, { ttl: 1000 });
                symbol.lastUpdate = historicData[historicData.length - 1].openTime;
                await this.symbolRepository.save(symbol);
                return historicUpdated;
            }),
        );
    }
}
