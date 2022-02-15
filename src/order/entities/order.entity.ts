import { ApiKey } from 'src/api-key/entities/api-key.entity';
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

    @Index()
    @ManyToOne((type) => OrderStatus)
    @JoinTable()
    status: OrderStatus;

    @Index()
    @ManyToOne((type) => ApiKey)
    @JoinTable()
    apiKey: ApiKey;

    @OneToMany((type) => Order, (order) => order.belongsTo)
    @JoinTable()
    orders: Order[];

    @Index()
    @ManyToOne((type) => Order, (order) => order.orders)
    @JoinTable()
    belongsTo: Order;
}
