import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    fullname: string;

    @Column()
    description: string;
}
