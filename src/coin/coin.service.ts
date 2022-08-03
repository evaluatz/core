import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { Coin } from './entities/coin.entity';

@Injectable()
export class CoinService {
    private readonly logger = new Logger('CoinService');
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

    findOne(name: string) {
        return this.coinRepository.findOneBy({ name });
    }

    update(id: number, updateCoinDto: UpdateCoinDto) {
        return `This action updates a #${id} coin`;
    }

    remove(id: number) {
        return `This action removes a #${id} coin`;
    }
    async sync() {
        this.logger.log(`[Sync] > : Starting`);
        try {
            this.logger.log(`[Sync] > : Loading`);
            const coinInfo = await this.binanceClient.coinInfo().then(({ data }) => data);
            console.log(coinInfo);
            this.logger.log(`[Sync] > : Formatting`);
            const coins = (
                (await Promise.all(
                    coinInfo.map(async (coin) =>
                        (await this.findOne(coin.coin))
                            ? undefined
                            : ({
                                  id: null,
                                  name: coin.coin,
                                  fullname: coin.name,
                                  description: coin.networkList.map((n) => n.name).join('|'),
                              } as Coin),
                    ),
                )) as Coin[]
            ).filter((coin) => coin);
            let coinsRes = [];
            if (coins.length > 0) {
                await coins.forEach((coin) =>
                    coin.name && coin.fullname
                        ? this.logger.log(`[Sync] > : ${coin.name}, ${coin.fullname}`)
                        : undefined,
                );
                const join = coins.join();
                this.logger.log(`[Sync] > : Saving`);
                coinsRes = await this.coinRepository.save(coins);
            }
            this.logger.log(`[Sync] > : Finished`);
            return coinsRes;
        } catch (e) {
            return e;
        }
    }
}
