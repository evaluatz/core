import { Source } from 'src/source/entities/source.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, Index, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ApiKey {
    @PrimaryColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    secret: string;

    @Index()
    @ManyToOne((type) => User)
    @JoinTable()
    user: User;

    @Index()
    @ManyToOne((type) => Source)
    @JoinTable()
    source: Source;
}
