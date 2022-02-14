import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { UpdateSymbolDto } from './dto/update-symbol.dto';

@Controller('symbol')
export class SymbolController {
  constructor(private readonly symbolService: SymbolService) {}

  @Post()
  create(@Body() createSymbolDto: CreateSymbolDto) {
    return this.symbolService.create(createSymbolDto);
  }

  @Get()
  findAll() {
    return this.symbolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.symbolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSymbolDto: UpdateSymbolDto) {
    return this.symbolService.update(+id, updateSymbolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.symbolService.remove(+id);
  }
}
