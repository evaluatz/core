import { User } from 'src/user/entities/user.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderStrategy {
    @PrimaryColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    fileName: string;

    @Index()
    @ManyToOne((type) => User)
    @JoinTable()
    creator: User;
}
