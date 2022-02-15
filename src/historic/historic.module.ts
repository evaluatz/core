import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { DatabaseModule } from 'src/database/database.module';
import { historicProviders } from './entities/historic.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [HistoricController],
    providers: [...historicProviders, HistoricService],
})
export class HistoricModule {}
