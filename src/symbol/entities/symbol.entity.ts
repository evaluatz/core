import { Coin } from 'src/coin/entities/coin.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Symbol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
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

    @Index()
    @Column()
    active: Boolean;
}
