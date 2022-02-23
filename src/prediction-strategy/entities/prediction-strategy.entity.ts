import { PredictionFeature } from 'src/prediction-feature/entities/prediction-feature.entity';
import { Prediction } from 'src/prediction/entities/prediction.entity';
import { Symbol } from 'src/symbol/entities/symbol.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class PredictionStrategy {
    @PrimaryColumn()
    id: string;

    @Index()
    @Column()
    secret: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Index()
    @ManyToOne((type) => User)
    creator: User;

    @Index()
    @ManyToOne((type) => Symbol)
    symbol: Symbol;

    @Index()
    @ManyToOne((type) => PredictionFeature)
    feature: PredictionFeature;

    @OneToMany((type) => Prediction, (prediction) => prediction.strategy)
    predictions: Prediction[];
}
