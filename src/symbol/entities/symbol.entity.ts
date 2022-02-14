import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Symbol {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    lastUpdate: Date;

    @Column()
    active: Boolean;
}
