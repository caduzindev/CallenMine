import { Between, InsertResult } from "typeorm";
import { DatesRepository } from "../../../../../data/protocols/dates-repository";
import { Dates } from "../../../../../domain/entities/scheduling";
import { TypeOrmSchedulingDate } from "../../entity/typeorm-scheduling-date";
import { AppDataSource } from "../../helper/app-data-source";
import { Mapper } from "./mapper";

export class TypeOrmDatesRepository implements DatesRepository {
    async add(data: { scheduling_id: number; date: string; }): Promise<string> {
        const insertResult: InsertResult = await AppDataSource.getInstance()
            .createQueryBuilder()
            .insert()
            .into(TypeOrmSchedulingDate)
            .values([{date: data.date,scheduling:{id:data.scheduling_id}}])
            .returning('id')
            .execute()

        return insertResult.identifiers[0].id
    }

    async addExpertToDate(data: { scheduling_date_id: number; expert_id: number; }): Promise<void> {
        await AppDataSource.getInstance()
            .createQueryBuilder()
            .insert()
            .into('scheduling_date_expert')
            .values(
                [
                    {
                        scheduling_date_id: data.scheduling_date_id,
                        expert_id: data.expert_id
                    }
                ]
            )
            .execute()
    }

    async datesOccupiedByExpert(data: { expert_id: number; period: {start: string,end: string}; }): Promise<Dates[]> {
        const result = await AppDataSource.getInstance()
            .getRepository(TypeOrmSchedulingDate)
            .find({
                select: {
                    id: true,
                    date: true
                },
                where: {
                    experts: { id:data.expert_id },
                    date: Between(data.period.start,data.period.end)
                }
            })

        const domainDates = Mapper.toDomainEntities(result)

        return domainDates
    }
}