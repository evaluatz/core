import { Module } from '@nestjs/common';
import { OrderSchemaService } from './order-schema.service';
import { OrderSchemaController } from './order-schema.controller';

@Module({
  controllers: [OrderSchemaController],
  providers: [OrderSchemaService]
})
export class OrderSchemaModule {}
