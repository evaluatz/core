import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PredictionFeature {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
