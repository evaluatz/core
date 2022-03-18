import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { OrderStrategy } from 'src/order-strategy/entities/order-strategy.entity';
import { PredictionStrategy } from 'src/prediction-strategy/entities/prediction-strategy.entity';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderSchema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    active: Boolean;

    @Column('decimal', { precision: 100, scale: 15 })
    quantity: number;

    @Index()
    @ManyToOne((type) => ApiKey)
    @JoinTable()
    apiKey: ApiKey;

    @Index()
    @ManyToOne((type) => Symbol)
    @JoinTable()
    symbol: Symbol;

    @Index()
    @ManyToOne((type) => OrderStrategy)
    @JoinTable()
    strategy: OrderStrategy;

    @Index()
    @ManyToOne((type) => PredictionStrategy)
    @JoinTable()
    lowPredictor?: PredictionStrategy;

    @Index()
    @ManyToOne((type) => PredictionStrategy)
    @JoinTable()
    highPredictor?: PredictionStrategy;
}
