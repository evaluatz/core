import { Symbol } from 'src/symbol/entities/symbol.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Historic {
    @PrimaryColumn({ type: 'bigint' })
    id: number;

    @Index()
    @Column()
    openTime: Date;

    @Column('decimal', { precision: 100, scale: 15 })
    open: number;

    @Column('decimal', { precision: 100, scale: 15 })
    high: number;

    @Column('decimal', { precision: 100, scale: 15 })
    low: number;

    @Column('decimal', { precision: 100, scale: 15 })
    close: number;

    @Column('decimal', { precision: 100, scale: 15 })
    volume: number;

    @Column()
    closeTime: Date;

    @Index()
    @ManyToOne((type) => Symbol)
    @JoinTable()
    symbol: Symbol;
}
