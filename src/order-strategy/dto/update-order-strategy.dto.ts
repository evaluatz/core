import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStrategyDto } from './create-order-strategy.dto';

export class UpdateOrderStrategyDto extends PartialType(CreateOrderStrategyDto) {}
