import { Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { SymbolController } from './symbol.controller';

@Module({
  controllers: [SymbolController],
  providers: [SymbolService]
})
export class SymbolModule {}
