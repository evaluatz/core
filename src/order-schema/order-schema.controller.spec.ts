import { Test, TestingModule } from '@nestjs/testing';
import { OrderSchemaController } from './order-schema.controller';
import { OrderSchemaService } from './order-schema.service';

describe('OrderSchemaController', () => {
  let controller: OrderSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderSchemaController],
      providers: [OrderSchemaService],
    }).compile();

    controller = module.get<OrderSchemaController>(OrderSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
