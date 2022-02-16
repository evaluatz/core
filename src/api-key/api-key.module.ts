import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { DatabaseModule } from 'src/database/database.module';
import { apiKeyProviders } from './entities/api-key.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ApiKeyController],
    providers: [...apiKeyProviders, ApiKeyService],
})
export class ApiKeyModule {}
