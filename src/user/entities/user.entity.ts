import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    created_at: Date;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column({ unique: true })
    email: string;
}
