import { PredictionStrategy } from 'src/prediction-strategy/entities/prediction-strategy.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Prediction {
    @PrimaryColumn()
    id: number;

    @Column()
    openTime: Date;

    @Column()
    value: number;

    @Index()
    @ManyToOne((type) => PredictionStrategy)
    @JoinTable()
    strategy: PredictionStrategy;
}
