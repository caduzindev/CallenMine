// import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
// import { TypeOrmExpert } from "./typeorm-expert";
// import { TypeOrmSchedulingDate } from "./typeorm-scheduling-date";

// @Entity("scheduling_date_expert")
// export class TypeOrmSchedulingDateExpert {
//     @PrimaryGeneratedColumn()
//     id: number

//     @ManyToOne(() => TypeOrmExpert, (typeOrmExpert) => typeOrmExpert.schedulingDateExpert)
//     @JoinColumn({
//         name: "expert_id",
//         referencedColumnName: "id",
//         foreignKeyConstraintName: "scheduling_date_expert_pkey",
//     })

//     expert: TypeOrmExpert

//     @ManyToOne(() => TypeOrmSchedulingDate, (typeOrmSchedulingDate) => typeOrmSchedulingDate.schedulingDateExpert)
//     @JoinColumn({
//         name: "scheduling_date_id",
//         referencedColumnName: "id",
//         foreignKeyConstraintName: "scheduling_date_expert_pkey"
//     })
//     date: TypeOrmSchedulingDate
// }