import { Column, PrimaryColumn } from 'typeorm';

export class Historic {
    @PrimaryColumn()
    id: number;

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
}
