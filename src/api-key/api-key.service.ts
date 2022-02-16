import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ApiKey } from './entities/api-key.entity';

@Injectable()
export class ApiKeyService {
    constructor(
        @Inject('API_KEY_REPOSITORY')
        private apiKeyRepository: Repository<ApiKey>,
    ) {}
    create(createApiKeyDto: CreateApiKeyDto) {
        const newApiKey = {
            created_at: new Date(),
            ...createApiKeyDto,
        } as CreateApiKeyDto;
        return this.apiKeyRepository.save(newApiKey);
    }

    findAll() {
        return `This action returns all apiKey`;
    }

    findOne(id: number) {
        return `This action returns a #${id} apiKey`;
    }

    update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
        return `This action updates a #${id} apiKey`;
    }

    remove(id: number) {
        return `This action removes a #${id} apiKey`;
    }
}
