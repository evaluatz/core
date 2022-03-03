import { Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { SymbolController } from './symbol.controller';
import { DatabaseModule } from 'src/database/database.module';
import { symbolProviders } from './entities/symbol.providers';
import { BinanceModule } from 'src/binance/binance.module';
import { coinProviders } from 'src/coin/entities/coin.providers';
import { CoinService } from 'src/coin/coin.service';

@Module({
    imports: [DatabaseModule, BinanceModule],
    controllers: [SymbolController],
    providers: [...symbolProviders, SymbolService, ...coinProviders, CoinService],
})
export class SymbolModule {}
