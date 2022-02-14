import { Injectable } from '@nestjs/common';
import { CreateOrderSchemaDto } from './dto/create-order-schema.dto';
import { UpdateOrderSchemaDto } from './dto/update-order-schema.dto';

@Injectable()
export class OrderSchemaService {
  create(createOrderSchemaDto: CreateOrderSchemaDto) {
    return 'This action adds a new orderSchema';
  }

  findAll() {
    return `This action returns all orderSchema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderSchema`;
  }

  update(id: number, updateOrderSchemaDto: UpdateOrderSchemaDto) {
    return `This action updates a #${id} orderSchema`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderSchema`;
  }
}
