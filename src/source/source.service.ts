import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source } from './entities/source.entity';

@Injectable()
export class SourceService {
    constructor(
        @Inject('SOURCE_REPOSITORY')
        private sourceRepository: Repository<Source>,
    ) {}
    create(createSourceDto: CreateSourceDto) {
        const newSource = { ...createSourceDto, active: true, id: null } as Source;
        return this.sourceRepository.save(newSource);
    }

    findAll() {
        return this.sourceRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} source`;
    }

    update(id: number, updateSourceDto: UpdateSourceDto) {
        return `This action updates a #${id} source`;
    }

    remove(id: number) {
        return `This action removes a #${id} source`;
    }
}
