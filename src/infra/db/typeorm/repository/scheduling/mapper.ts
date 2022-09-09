import { Scheduling } from "../../../../../domain/entities/scheduling";
import { TypeOrmScheduling } from "../../entity/typeorm-scheduling";
export class Mapper {
    public static toDomainEntity(typeOrmScheduling: TypeOrmScheduling): Scheduling {
        const domain: Scheduling = {
            id: typeOrmScheduling.id,
            customer: typeOrmScheduling.customer,
            note: typeOrmScheduling.note,
            schedules: typeOrmScheduling.dates
        }

        return domain
    }

    public static toDomainEntities(typeOrmSchedulings: TypeOrmScheduling[]): Scheduling[] {
        return typeOrmSchedulings.map(typeOrmSchedulings => this.toDomainEntity(typeOrmSchedulings));
    }

    public static toOrmEntity(domain: Scheduling): TypeOrmScheduling {
        const orm: TypeOrmScheduling = new TypeOrmScheduling()

        orm.customer.document = domain.customer.document
        orm.note = domain.note

        return orm
    }
}