import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { DatabaseModule } from 'src/database/database.module';
import { sourceProviders } from './entities/source.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [SourceController],
    providers: [...sourceProviders, SourceService],
})
export class SourceModule {}
