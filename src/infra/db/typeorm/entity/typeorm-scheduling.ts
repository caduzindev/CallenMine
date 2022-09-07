import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TypeOrmCustomer } from "./typeorm-customer";
import { TypeOrmSchedulingDate } from "./typeorm-scheduling-date";

@Entity("scheduling")
export class TypeOrmScheduling {
    @PrimaryColumn({ primaryKeyConstraintName: "scheduling_pkey" })
    id: number

    @ManyToOne(()=>TypeOrmCustomer,(typeOrmScheduling)=>typeOrmScheduling.schedules)
    @JoinColumn({
        name: "customer_document",
        referencedColumnName: "document",
        foreignKeyConstraintName: "scheduling_customer_document_fkey"
    })
    customer: TypeOrmCustomer

    @Column()
    note: string

    @OneToMany(()=>TypeOrmSchedulingDate,(typeOrmSchedulingDate)=>typeOrmSchedulingDate.scheduling)
    dates: TypeOrmSchedulingDate[]
}