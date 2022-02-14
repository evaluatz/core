import { User } from 'src/user/entities/user.entity';
import { Column, Index, JoinTable, OneToOne, PrimaryColumn } from 'typeorm';
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
    @OneToOne((type) => User)
    @JoinTable()
    creator: User;
}
