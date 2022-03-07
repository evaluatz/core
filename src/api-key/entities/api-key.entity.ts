import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Source } from '../../source/entities/source.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class ApiKey {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    key: string;

    @Column()
    secret: string;

    @Column()
    created_at: Date;

    @Index()
    @ManyToOne((type) => User)
    @JoinTable()
    user: User;

    @Index()
    @ManyToOne((type) => Source)
    @JoinTable()
    source: Source;
}
