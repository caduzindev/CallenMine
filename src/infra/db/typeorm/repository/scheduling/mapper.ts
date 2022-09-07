import { Scheduling } from "../../../../../domain/entities/scheduling";
import { TypeOrmScheduling } from "../../entity/typeorm-scheduling";

export class Mapper {
    public static toDomainEntity(typeOrmScheduling: TypeOrmScheduling): Scheduling {
        const domain: Scheduling = {
            customer: typeOrmScheduling.customer,
            note: typeOrmScheduling.note,
            schedules: typeOrmScheduling.dates
        }

        return domain
    }

    public static toDomainEntities(typeOrmSchedulings: TypeOrmScheduling[]): Scheduling[] {
        return typeOrmSchedulings.map(typeOrmSchedulings => this.toDomainEntity(typeOrmSchedulings));
    }
}