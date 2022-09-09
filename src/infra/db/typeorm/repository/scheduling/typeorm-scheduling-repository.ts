import { In, InsertResult } from "typeorm";
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

    async add(data: { customer_document: string; note: string; }): Promise<number> {
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

    async getSchedulingsFromExpert(expert_id: number): Promise<Scheduling[]> {
        let schedulingDateIds = await AppDataSource.getInstance()
            .query(`select scheduling_date_id from scheduling_date_expert where expert_id=${expert_id}`)

        schedulingDateIds = schedulingDateIds.map(date=>date.scheduling_date_id)

        const result = await AppDataSource.getInstance()
            .getRepository(TypeOrmScheduling)
            .find(
            {
                relations: {
                    customer: true,
                    dates: {
                        experts: true
                    }
                },
                where: {
                    dates: {
                        id: In(schedulingDateIds)
                    }
                }
            }
            )

        const domainSchedulings = Mapper.toDomainEntities(result)

        return domainSchedulings
    }

    async getSchedulingFromDate(scheduling_date_id: number): Promise<Scheduling|null> {
        let domainScheduling: Scheduling | null = null
        const result = await AppDataSource.getInstance()
            .getRepository(TypeOrmScheduling)
            .findOne(
            {
                relations: {
                    customer: true,
                    dates: {
                        experts: true
                    }
                },
                where: {
                    dates: {
                        id: scheduling_date_id
                    }
                }
            }
        )

        if (result) {
            domainScheduling = Mapper.toDomainEntity(result)
        }

        return domainScheduling
    }
}