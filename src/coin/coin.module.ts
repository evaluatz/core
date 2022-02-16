import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { DatabaseModule } from 'src/database/database.module';
import { coinProviders } from './entities/coin.providers';
import { binanceProviders } from 'src/binance/binance.providers';
import { BinanceModule } from 'src/binance/binance.module';

@Module({
    imports: [DatabaseModule, BinanceModule],
    controllers: [CoinController],
    providers: [...coinProviders, CoinService],
})
export class CoinModule {}
