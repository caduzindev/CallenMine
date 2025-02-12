import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeOrmSchedulingDate } from "./typeorm-scheduling-date";
@Entity("expert")
export class TypeOrmExpert {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'expert_pkey' })
    id: number

    @Column()
    name: string

    @Column({type: "varchar",array: true })
    expertises: string[]

    @ManyToMany(() => TypeOrmSchedulingDate, (typeOrmSchedulingDate) => typeOrmSchedulingDate.experts)
    dates: TypeOrmSchedulingDate[]
}