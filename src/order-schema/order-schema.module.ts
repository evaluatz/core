import { Module } from '@nestjs/common';
import { OrderSchemaService } from './order-schema.service';
import { OrderSchemaController } from './order-schema.controller';
import { orderSchemaProviders } from './entities/order-schema.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { SymbolService } from 'src/symbol/symbol.service';
import { OrderStrategyService } from 'src/order-strategy/order-strategy.service';

@Module({
    imports: [DatabaseModule],
    controllers: [OrderSchemaController],
    providers: [...orderSchemaProviders, OrderSchemaService],
})
export class OrderSchemaModule {}
