import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { DatabaseModule } from 'src/database/database.module';
import { historicProviders } from './entities/historic.providers';
import { symbolProviders } from 'src/symbol/entities/symbol.providers';
import { BinanceModule } from 'src/binance/binance.module';

@Module({
    imports: [DatabaseModule, BinanceModule],
    controllers: [HistoricController],
    providers: [...historicProviders, HistoricService, ...symbolProviders],
})
export class HistoricModule {}
