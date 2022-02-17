import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { Coin } from './entities/coin.entity';

@Injectable()
export class CoinService {
    constructor(
        @Inject('COIN_REPOSITORY')
        private coinRepository: Repository<Coin>,
        @Inject('BINANCE_CONNECTION')
        private binanceClient: any,
    ) {}

    create(createCoinDto: CreateCoinDto) {
        const newCoin = {
            id: null,
            ...createCoinDto,
        } as Coin;
        return this.coinRepository.save(newCoin);
    }

    findAll() {
        return this.coinRepository.find();
    }

    findOne(id: number) {
        return this.coinRepository.findOne({ id });
    }

    update(id: number, updateCoinDto: UpdateCoinDto) {
        return `This action updates a #${id} coin`;
    }

    remove(id: number) {
        return `This action removes a #${id} coin`;
    }

    async sync() {
        try {
            const coinInfo = await this.binanceClient.coinInfo().then(({ data }) => data);
            const coins = await Promise.all(
                coinInfo.map(
                    async (coin) =>
                        ({
                            id: null,
                            name: coin.coin,
                            fullname: coin.name,
                            description: coin.networkList.map((n) => n.name).join('|'),
                        } as Coin),
                ),
            );
            return this.coinRepository.save(coins);
        } catch (e) {
            return e;
        }
    }
}
