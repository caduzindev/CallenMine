import { SchedulingRepository } from "../../../../../data/protocols/scheduling-repository";
import { Scheduling } from "../../../../../domain/entities/scheduling";
import { TypeOrmCustomer } from "../../entity/typeorm-customer";
import { TypeOrmScheduling } from "../../entity/typeorm-scheduling";
import { TypeOrmSchedulingDate } from "../../entity/typeorm-scheduling-date";
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
}