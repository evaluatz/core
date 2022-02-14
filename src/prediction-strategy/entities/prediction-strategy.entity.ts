import { PredictionFeature } from 'src/prediction-feature/entities/prediction-feature.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Index, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

export class PredictionStrategy {
    @PrimaryColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Index()
    @ManyToOne((type) => User)
    @JoinTable()
    creator: User;

    @Index()
    @ManyToOne((type) => Symbol)
    @JoinTable()
    symbol: Symbol;

    @Index()
    @ManyToOne((type) => PredictionFeature)
    @JoinTable()
    feature: PredictionFeature;
}
