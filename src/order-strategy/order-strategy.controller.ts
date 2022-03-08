import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStrategyService } from './order-strategy.service';
import { CreateOrderStrategyDto } from './dto/create-order-strategy.dto';
import { UpdateOrderStrategyDto } from './dto/update-order-strategy.dto';

@Controller('order-strategy')
export class OrderStrategyController {
    constructor(private readonly orderStrategyService: OrderStrategyService) {}

    @Post()
    create(@Body() createOrderStrategyDto: CreateOrderStrategyDto) {
        return this.orderStrategyService.create(createOrderStrategyDto);
    }

    @Get()
    findAll() {
        return this.orderStrategyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderStrategyService.findOne(+id);
    }
}
