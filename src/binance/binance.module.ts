import { Module } from '@nestjs/common';
import { binanceProviders } from './binance.providers';

@Module({
    providers: [...binanceProviders],
    exports: [...binanceProviders],
})
export class BinanceModule {}
