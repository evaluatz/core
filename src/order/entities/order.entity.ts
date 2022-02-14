import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Order {
    @PrimaryColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    isBuy: Boolean;

    @Index()
    @OneToOne((type) => OrderStatus)
    @JoinTable()
    status: OrderStatus;

    @Index()
    @ManyToOne((type) => ApiKey)
    @JoinTable()
    apiKey: ApiKey;

    @Index()
    @OneToMany((type) => Order, (order) => order.belongsTo)
    @JoinTable()
    orders: Order[];

    @Index()
    @ManyToOne((type) => Order, (order) => order.orders)
    @JoinTable()
    belongsTo: Order;
}
