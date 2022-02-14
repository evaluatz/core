import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    created_at: Date;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column()
    email: string;
}
