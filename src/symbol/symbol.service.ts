import { Inject, Injectable } from '@nestjs/common';
import { Coin } from 'src/coin/entities/coin.entity';
import { Repository } from 'typeorm';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { UpdateSymbolDto } from './dto/update-symbol.dto';
import { Symbol } from './entities/symbol.entity';

@Injectable()
export class SymbolService {
    constructor(
        @Inject('SYMBOL_REPOSITORY')
        private symbolRepository: Repository<Symbol>,
        @Inject('COIN_REPOSITORY')
        private coinRepository: Repository<Coin>,
        @Inject('BINANCE_CONNECTION')
        private binanceClient: any,
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
    async sync() {
        const exchangeInfo = await this.binanceClient.exchangeInfo().then(({ data }) => data);
        const symbolsData = (await Promise.all(
            exchangeInfo.symbols.map(async (symb) => {
                const { baseAsset, quoteAsset, symbol, status } = symb;
                const coins = await this.coinRepository.find({
                    where: [{ name: baseAsset as string }, { name: quoteAsset as string }],
                });
                //Check if already exist
                if (await this.findOne(symbol)) return;
                return {
                    name: symbol,
                    from: coins.find((c) => c.name == baseAsset),
                    to: coins.find((c) => c.name == quoteAsset),
                    id: null,
                    lastUpdate: new Date('2000-01-01'),
                    active: false,
                    //active: status === 'TRADING',
                } as Symbol;
            }),
        )) as Symbol[];
        return this.symbolRepository.save(symbolsData);
    }
}
