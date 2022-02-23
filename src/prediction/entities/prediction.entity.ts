import { PredictionStrategy } from 'src/prediction-strategy/entities/prediction-strategy.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

@Entity()
export class Prediction {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    openTime: Date;

    @Column('decimal', { precision: 100, scale: 15 })
    value: number;

    @Index()
    @ManyToOne((type) => PredictionStrategy, (predictionStrategy) => predictionStrategy.predictions)
    strategy: PredictionStrategy;
}
