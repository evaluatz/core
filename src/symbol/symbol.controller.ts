import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { UpdateSymbolDto } from './dto/update-symbol.dto';

@Controller('symbol')
export class SymbolController {
    constructor(private readonly symbolService: SymbolService) {}

    @Post()
    create() {
        return this.symbolService.sync();
    }

    @Get()
    findAll() {
        return this.symbolService.findAll();
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.symbolService.findOne(name);
    }
}
