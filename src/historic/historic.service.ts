import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as moment from 'moment';
import { resolve } from 'path/posix';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import * as techIndicators from 'technicalindicators';
import { Repository } from 'typeorm';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { Historic } from './entities/historic.entity';

@Injectable()
export class HistoricService {
    private readonly logger = new Logger('HistoricService');

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

    async updateAllWithMetrics(symbol: Symbol) {
        this.logger.log(`[UpdateMetrics] > ${symbol.name} : Loading DB `);
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
        this.logger.log(`[UpdateMetrics] > ${symbol.name} : Calculating`);
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
        const histAnalysisJson = [];
        const histAnalysis = {
            headers: [
                'id',
                'open',
                'high',
                'low',
                'ma50',
                'ma100',
                'ma200',
                'rsi14',
                'roc14',
                'adx14',
                'mdi14',
                'pdi14',
                'adl',
            ],
            data: [],
        };
        this.logger.log(`[UpdateMetrics] > ${symbol.name} : Formatting`);

        for (let i = 0; i < historicData.length; i++) {
            // histAnalysisJson.push({
            //     id: historicData[i].openTime,
            //     open: +historicData[i].open,
            //     high: +historicData[i].high,
            //     low: +historicData[i].low,
            //     ma50: MA50_values[i],
            //     ma100: MA100_values[i],
            //     ma200: MA200_values[i],
            //     rsi14: RSI_values[i],
            //     roc14: ROC_values[i],
            //     adx14: ADX_values[i]?.adx,
            //     mdi14: ADX_values[i]?.mdi,
            //     pdi14: ADX_values[i]?.pdi,
            //     adl: ADL_values[i],
            // });

            histAnalysis.data.push([
                historicData[i].openTime,
                +historicData[i].open,
                +historicData[i].high,
                +historicData[i].low,
                MA50_values[i],
                MA100_values[i],
                MA200_values[i],
                RSI_values[i],
                ROC_values[i],
                ADX_values[i]?.adx,
                ADX_values[i]?.mdi,
                ADX_values[i]?.pdi,
                ADL_values[i],
            ]);
        }
        this.logger.log(`[UpdateMetrics] > ${symbol.name} : Caching`);

        // await this.cacheManager.set(`historic_${symbol.name}_json`, histAnalysisJson, { ttl: 900 });
        await this.cacheManager.set(`historic_${symbol.name}`, histAnalysis, { ttl: 900 });

        return;
    }
    async sync() {
        const currentTime = moment();
        const cacheSessionID = `loading_symbols_${currentTime.toISOString()}`;
        this.logger.log(`${currentTime.toISOString()} [Sync] > : Starting`);
        if (await this.cacheManager.get(cacheSessionID)) {
            this.logger.log(`${currentTime.toISOString()} [Sync] > : Symbols Locked`);
            return 'Symbols Locked';
        }
        this.logger.log(`${currentTime.toISOString()} [Sync] > : Caching session`);
        await this.cacheManager.set(cacheSessionID, 'true', {
            ttl: 30,
        });
        this.logger.log(`${currentTime.toISOString()} [Sync] > : Loading Symbols`);
        const symbols = await this.symbolRepository.find({ where: { active: true } });

        this.logger.log(`${currentTime.toISOString()} [Sync] > : Clean cache session`);

        await this.cacheManager.del(cacheSessionID);

        return await Promise.all(
            symbols.map(async (symbol) => {
                const cacheKey = `historic_${symbol.name}`;
                const nextUpdate = moment(symbol.lastUpdate).add(15, 'minutes').toDate();
                const cacheLoading = `loading_${cacheKey}_${nextUpdate.getTime()}`;
                try {
                    this.logger.log(
                        `${currentTime.toISOString()} [Sync] > ${symbol.name} : Checking`,
                    );

                    if (await this.cacheManager.get(cacheLoading)) {
                        this.logger.log(
                            `${currentTime.toISOString()}[Sync] > ${
                                symbol.name
                            } : Already updating`,
                        );
                        return `${currentTime.toISOString()}[Sync] > ${
                            symbol.name
                        } : Already updating`;
                    }
                    if (nextUpdate > new Date()) {
                        this.logger.log(
                            `${currentTime.toISOString()} [Sync] > ${
                                symbol.name
                            } : Nothing to update`,
                        );
                        return `${currentTime.toISOString()} [Sync] > ${
                            symbol.name
                        } : Nothing to update`;
                    }

                    this.logger.log(
                        `${currentTime.toISOString()} [Sync] > ${symbol.name} : Starting`,
                    );

                    const options = {
                        startTime: +nextUpdate.getTime(),
                        limit: 1000,
                    };

                    await this.cacheManager.set(cacheLoading, 'true', {
                        ttl: 900,
                    });
                    const klines = await this.binanceClient
                        .klines(symbol.name, '15m', options)
                        .then(({ data }) => data);

                    if (!klines || klines.length === 0) {
                        this.logger.log(
                            `${currentTime.toISOString()} [Sync] > ${
                                symbol.name
                            } : Nothing to update`,
                        );
                        return `${currentTime.toISOString()} [Sync] > ${
                            symbol.name
                        } : Nothing to update`;
                    }

                    const historicData: Historic[] = await Promise.all(
                        klines.map(async (d) =>
                            this.historicRepository.create({
                                id: +`${symbol.id}${new Date(d[0])
                                    .getTime()
                                    .toString()
                                    .substring(0, 9)}`,
                                symbol: symbol,
                                openTime: new Date(d[0]),
                                open: +d[1],
                                high: +d[2],
                                low: +d[3],
                                close: +d[4],
                                volume: +d[5],
                                closeTime: new Date(d[6]),
                            }),
                        ),
                    );
                    this.logger.log(
                        `${currentTime.toISOString()} [Sync] > ${symbol.name} : Saving DB`,
                    );

                    try {
                        this.logger.log(
                            `${currentTime.toISOString()} [Sync] > ${
                                symbol.name
                            } : Trying 1st method`,
                        );
                        await this.historicRepository
                            .createQueryBuilder()
                            .insert()
                            .into(Historic)
                            .values(historicData)
                            .orUpdate({
                                conflict_target: ['id'],
                                overwrite: ['high', 'low', 'close', 'volume'],
                            })
                            .execute();
                    } catch (e) {
                        this.logger.log(
                            `${currentTime.toISOString()} [Sync] > ${
                                symbol.name
                            } : Trying 3rd method`,
                        );
                        const histToCheck = (
                            await this.historicRepository.find({
                                select: ['id'],
                                order: { openTime: 'DESC' },
                                take: 1000,
                                where: {
                                    symbol,
                                },
                            })
                        ).map((h) => +h.id);

                        const toExecuteInChunk = historicData.filter(
                            (h) => !histToCheck.includes(h.id),
                        );
                        await Promise.all(
                            toExecuteInChunk.map(async (h) => {
                                try {
                                    this.logger.log(
                                        `${currentTime.toISOString()} [Sync] > ${symbol.name}:${
                                            h.id
                                        } : Saving`,
                                    );
                                    await this.historicRepository.save(h);
                                } catch (e) {
                                    this.logger.log(
                                        ` ${currentTime.toISOString()} [Sync] > ${
                                            h.id
                                        } : Error to save`,
                                    );
                                }
                            }),
                        );
                    }
                    await this.updateAllWithMetrics(symbol);
                    symbol.lastUpdate = historicData[historicData.length - 1].openTime;
                    this.logger.log(
                        `${currentTime.toISOString()} [Sync] > ${symbol.name} : Saving Last update`,
                    );

                    await this.symbolRepository.save(symbol);
                    this.logger.log(
                        `${currentTime.toISOString()} [Sync] > ${symbol.name} : Finished`,
                    );
                } catch (e) {
                    console.log(e);
                } finally {
                    this.logger.log(
                        `${currentTime.toISOString()} [Sync] > ${symbol.name} : End Session`,
                    );
                    await this.cacheManager.del(cacheLoading);
                    return `${currentTime.toISOString()} [Sync] > ${symbol.name} : End Session`;
                }
            }),
        );
    }
}
