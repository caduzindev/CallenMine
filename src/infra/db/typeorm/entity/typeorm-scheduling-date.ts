import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeOrmExpert } from "./typeorm-expert";
import { TypeOrmScheduling } from "./typeorm-scheduling";

@Entity("scheduling_date")
export class TypeOrmSchedulingDate {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: "scheduling_date_pkey" })
    id: number

    @ManyToOne(()=>TypeOrmScheduling,(typeOrmSchedulingDate)=>typeOrmSchedulingDate.dates)
    @JoinColumn({
        name: "scheduling_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "scheduling_customer_document_fkey"
    })
    scheduling: TypeOrmScheduling

    @Column({type: 'date'})
    date: string

    @ManyToMany(() => TypeOrmExpert, (typeOrmExpert) => typeOrmExpert.dates)
    @JoinTable({
        name: "scheduling_date_expert",
        joinColumn: {
            name: "scheduling_date_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "scheduling_date_expert_pkey"
        },
        inverseJoinColumn: {
            name: "expert_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "scheduling_date_expert_pkey"
        },
    })
    experts: TypeOrmExpert[]
}