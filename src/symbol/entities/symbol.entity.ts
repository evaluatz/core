import { Coin } from 'src/coin/entities/coin.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Symbol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Index()
    @ManyToOne((type) => Coin)
    @JoinTable()
    from: Coin;

    @Index()
    @ManyToOne((type) => Coin)
    @JoinTable()
    to: Coin;

    @Column()
    lastUpdate: Date;

    @Column()
    active: Boolean;
}
