import { Inject, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { UpdateHistoricDto } from './dto/update-historic.dto';
import { Historic } from './entities/historic.entity';

@Injectable()
export class HistoricService {
    constructor(
        @Inject('HISTORIC_REPOSITORY')
        private historicRepository: Repository<Historic>,
    ) {}
    create(createHistoricDto: CreateHistoricDto) {
        return 'This action adds a new historic';
    }

    findAll() {
        return this.historicRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} historic`;
    }

    update(id: number, updateHistoricDto: UpdateHistoricDto) {
        return `This action updates a #${id} historic`;
    }

    remove(id: number) {
        return `This action removes a #${id} historic`;
    }
}
