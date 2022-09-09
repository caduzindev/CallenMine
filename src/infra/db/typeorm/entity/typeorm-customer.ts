import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeOrmScheduling } from "./typeorm-scheduling";

@Entity("customer")
export class TypeOrmCustomer {
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'customer_pkey' })
    document: string

    @Column()
    name: string

    @OneToMany(()=>TypeOrmScheduling,(typeOrmScheduling)=>typeOrmScheduling.customer)
    schedules: TypeOrmScheduling[]
}