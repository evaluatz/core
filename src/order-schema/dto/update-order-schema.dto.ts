import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderSchemaDto } from './create-order-schema.dto';

export class UpdateOrderSchemaDto extends PartialType(CreateOrderSchemaDto) {}
