import { User } from 'src/user/entities/user.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderStrategy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    createdAt: Date;

    @Index()
    @ManyToOne((type) => User)
    @JoinTable()
    creator: User;
}
