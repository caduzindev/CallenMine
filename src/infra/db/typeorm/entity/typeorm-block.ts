import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('scheduling_block')
export class TypeOrmBlock {
    @PrimaryColumn({ primaryKeyConstraintName: 'scheduling_block_pkey' })
    id: number

    @Column()
    start_date: string

    @Column()
    end_date: string

    @Column()
    note: string
}