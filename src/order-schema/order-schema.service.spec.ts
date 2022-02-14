import { Test, TestingModule } from '@nestjs/testing';
import { OrderSchemaService } from './order-schema.service';

describe('OrderSchemaService', () => {
  let service: OrderSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderSchemaService],
    }).compile();

    service = module.get<OrderSchemaService>(OrderSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
