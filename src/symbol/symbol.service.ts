import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinService } from 'src/coin/coin.service';
import { Coin } from 'src/coin/entities/coin.entity';
import { Repository } from 'typeorm';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { UpdateSymbolDto } from './dto/update-symbol.dto';
import { Symbol } from './entities/symbol.entity';

@Injectable()
export class SymbolService {
    private readonly logger = new Logger('SymbolService');
    constructor(
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
        @Inject('COIN_REPOSITORY')
        private coinRepository: Repository<Coin>,
        @Inject('BINANCE_CONNECTION')
        private binanceClient: any,
        private readonly coinService: CoinService,
    ) {}
    create(createSymbolDto: CreateSymbolDto) {
        const newSymbol = {
            id: null,
            lastUpdate: new Date('2000-01-01'),
            active: false,
            ...createSymbolDto,
        } as Symbol;

        return this.symbolRepository.save(newSymbol);
    }

    findAll() {
        return this.symbolRepository.find();
    }

    findOne(name: string) {
        return this.symbolRepository.findOne({ name });
    }

    update(id: number, updateSymbolDto: UpdateSymbolDto) {
        return `This action updates a #${id} symbol`;
    }

    remove(id: number) {
        return `This action removes a #${id} symbol`;
    }

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
    async sync() {
        this.logger.log(`[Sync] > : Starting`);

        await this.coinService.sync();
        this.logger.log(`[Sync] > : Loading`);

        const exchangeInfo = await this.binanceClient.exchangeInfo().then(({ data }) => data);
        this.logger.log(`[Sync] > : Formatting`);
        const symbolsData = (
            (await Promise.all(
                exchangeInfo.symbols.map(async (symb) => {
                    const { baseAsset, quoteAsset, symbol, status } = symb;
                    //Check if already exist
                    if (await this.findOne(symbol)) return;

                    const coins = await this.coinRepository.find({
                        where: [{ name: baseAsset as string }, { name: quoteAsset as string }],
                    });
                    const from = coins.find((c) => c.name == baseAsset);
                    const to = coins.find((c) => c.name == quoteAsset);
                    if (!from || !to) return undefined;

                    return {
                        name: symbol,
                        from,
                        to,
                        id: null,
                        lastUpdate: new Date('2000-01-01'),
                        active: false,
                        //active: status === 'TRADING',
                    } as Symbol;
                }),
            )) as Symbol[]
        ).filter((symbol) => symbol);
        let symbolsRes = [];
        if (symbolsData.length > 0) {
            this.logger.log(`[Sync] > : Saving`);
            symbolsRes = await this.symbolRepository.save(symbolsData);
        }
        this.logger.log(`[Sync] > : Finished`);

        return symbolsRes;
    }
}
