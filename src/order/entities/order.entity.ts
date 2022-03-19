import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderSchema } from 'src/order-schema/entities/order-schema.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    isBuy: Boolean;

    @Column('decimal', { precision: 100, scale: 15 })
    value: number;

    @Index()
    @ManyToOne((type) => OrderSchema)
    @JoinTable()
    schema: OrderSchema;

    @Index()
    @ManyToOne((type) => OrderStatus)
    @JoinTable()
    status: OrderStatus;

    @OneToMany((type) => Order, (order) => order.belongsTo)
    @JoinTable()
    orders: Order[];

    @Index()
    @ManyToOne((type) => Order, (order) => order.orders)
    @JoinTable()
    belongsTo: Order;
}
