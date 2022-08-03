import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderSchemaService } from './order-schema.service';
import { CreateOrderSchemaDto } from './dto/create-order-schema.dto';
import { UpdateOrderSchemaDto } from './dto/update-order-schema.dto';

@Controller('order-schema')
export class OrderSchemaController {
    constructor(private readonly orderSchemaService: OrderSchemaService) {}

    @Post()
    create(@Body() createOrderSchemaDto: CreateOrderSchemaDto) {
        return this.orderSchemaService.create(createOrderSchemaDto);
    }

    @Get()
    findAll() {
        return this.orderSchemaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderSchemaService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderSchemaDto: UpdateOrderSchemaDto) {
        return this.orderSchemaService.update(+id, updateOrderSchemaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderSchemaService.remove(+id);
    }
}
