import { Inject, Injectable } from '@nestjs/common';
import { Source } from 'src/source/entities/source.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { ApiKey } from './entities/api-key.entity';

@Injectable()
export class ApiKeyService {
    constructor(
        @Inject('API_KEY_REPOSITORY')
        private apiKeyRepository: Repository<ApiKey>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        @Inject('SOURCE_REPOSITORY')
        private sourceRepository: Repository<Source>,
    ) {}
    async create(createApiKeyDto: CreateApiKeyDto) {
        const { key, secret, userId, sourceId } = createApiKeyDto;
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) throw 'Invalid User';

        const source = await this.sourceRepository.findOne({ id: sourceId });
        if (!user) throw 'Invalid Source';

        const newApiKey = await this.apiKeyRepository.create({
            user,
            source,
            created_at: new Date(),
            key,
            secret,
        });
        return this.apiKeyRepository.save(newApiKey);
    }

    findAll() {
        return this.apiKeyRepository.find();
    }

    findOne(id: number) {
        return this.apiKeyRepository.findOne({ id });
    }

    async update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
        const { key, secret } = updateApiKeyDto;
        const newApiKey = { ...(await this.apiKeyRepository.findOne({ id })), key, secret };

        return this.apiKeyRepository.save(newApiKey);
    }

    remove(id: number) {
        return this.apiKeyRepository.delete({ id });
    }
}
