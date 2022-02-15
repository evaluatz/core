import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderStrategy } from 'src/order-strategy/entities/order-strategy.entity';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Column, Entity, Index, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column('decimal', { precision: 100, scale: 15 })
    quantity: number;

    @Index()
    @OneToOne((type) => ApiKey)
    @JoinTable()
    apiKey: ApiKey;

    @Index()
    @OneToOne((type) => Symbol)
    @JoinTable()
    symbol: Symbol;

    @Index()
    @OneToOne((type) => OrderStrategy)
    @JoinTable()
    strategy: OrderStrategy;
}
