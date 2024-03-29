import { Test, TestingModule } from '@nestjs/testing';
import { SymbolController } from './symbol.controller';
import { SymbolService } from './symbol.service';

describe('SymbolController', () => {
  let controller: SymbolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymbolController],
      providers: [SymbolService],
    }).compile();

    controller = module.get<SymbolController>(SymbolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
