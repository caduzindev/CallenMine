import { InsertResult } from "typeorm";
import { DatesRepository } from "../../../../../data/protocols/dates-repository";
import { TypeOrmSchedulingDate } from "../../entity/typeorm-scheduling-date";
import { AppDataSource } from "../../helper/app-data-source";

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
}