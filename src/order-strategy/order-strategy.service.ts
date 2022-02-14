import { Injectable } from '@nestjs/common';
import { CreateOrderStrategyDto } from './dto/create-order-strategy.dto';
import { UpdateOrderStrategyDto } from './dto/update-order-strategy.dto';

@Injectable()
export class OrderStrategyService {
  create(createOrderStrategyDto: CreateOrderStrategyDto) {
    return 'This action adds a new orderStrategy';
  }

  findAll() {
    return `This action returns all orderStrategy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStrategy`;
  }

  update(id: number, updateOrderStrategyDto: UpdateOrderStrategyDto) {
    return `This action updates a #${id} orderStrategy`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStrategy`;
  }
}
