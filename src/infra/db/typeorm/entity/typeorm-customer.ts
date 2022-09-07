import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TypeOrmScheduling } from "./typeorm-scheduling";

@Entity("customer")
export class TypeOrmCustomer {
    @PrimaryColumn({ primaryKeyConstraintName: 'customer_pkey' })
    document: string

    @Column()
    name: string

    @OneToMany(()=>TypeOrmScheduling,(typeOrmScheduling)=>typeOrmScheduling.customer)
    schedules: TypeOrmScheduling[]
}