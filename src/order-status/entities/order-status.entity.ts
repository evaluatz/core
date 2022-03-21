import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum enumOrderStatus {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    FILLED = 'FILLED',
    NEW = 'NEW',
}

@Entity()
export class OrderStatus {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: enumOrderStatus,
        default: enumOrderStatus.PENDING,
    })
    name: enumOrderStatus;
}
