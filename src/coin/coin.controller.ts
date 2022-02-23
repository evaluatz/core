import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('coin')
export class CoinController {
    constructor(private readonly coinService: CoinService) {}

    @Post()
    create() {
        return this.coinService.sync();
    }

    @Get()
    findAll() {
        return this.coinService.findAll();
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.coinService.findOne(name);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoinDto: UpdateCoinDto) {
        return this.coinService.update(+id, updateCoinDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coinService.remove(+id);
    }
}
