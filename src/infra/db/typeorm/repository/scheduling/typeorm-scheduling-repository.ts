import { InsertResult } from "typeorm";
import { SchedulingRepository } from "../../../../../data/protocols/scheduling-repository";
import { Scheduling } from "../../../../../domain/entities/scheduling";
import { TypeOrmScheduling } from "../../entity/typeorm-scheduling";
import { AppDataSource } from "../../helper/app-data-source";
import { Mapper } from "./mapper";

export class TypeOrmSchedulingRepository implements SchedulingRepository {
    async getAll(): Promise<Scheduling[]> {
        const result: TypeOrmScheduling[] = await AppDataSource.getInstance()
            .getRepository(TypeOrmScheduling)
            .find({
                relations: {
                    customer: true,
                    dates: {
                        experts: true
                    }
                }
            })

        const domainSchedulings = Mapper.toDomainEntities(result)

        return domainSchedulings
    }

    async get(scheduling_id: number): Promise<Scheduling|null> {
        let domainScheduling: Scheduling | null = null
        const result: TypeOrmScheduling | null = await AppDataSource.getInstance()
            .getRepository(TypeOrmScheduling)
            .findOne({
                where: {
                    id: scheduling_id
                },
                relations: {
                    customer: true,
                    dates: {
                        experts: true
                    }
                }
            })
        if (result) {
            domainScheduling = Mapper.toDomainEntity(result)
        }

        return domainScheduling
    }

    async add(data: { customer_document: string; note: string; }): Promise<string> {
        const insertResult: InsertResult = await AppDataSource.getInstance()
            .createQueryBuilder()
            .insert()
            .into(TypeOrmScheduling)
            .values(
                [
                    {
                    customer:{document:data.customer_document},
                    note: data.note
                    }
                ]
            )
            .returning('id')
            .execute()
        return insertResult.identifiers[0].id
    }
}