import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { sourceProviders } from 'src/source/entities/source.providers';
import { userProviders } from 'src/user/entities/user.providers';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-key.service';
import { apiKeyProviders } from './entities/api-key.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ApiKeyController],
    providers: [...apiKeyProviders, ApiKeyService, ...userProviders, ...sourceProviders],
})
export class ApiKeyModule {}
