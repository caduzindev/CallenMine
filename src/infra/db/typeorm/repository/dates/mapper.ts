import { Dates } from "../../../../../domain/entities/scheduling";
import { TypeOrmSchedulingDate } from "../../entity/typeorm-scheduling-date";

export class Mapper {
    public static toDomainEntity(typeOrmSchedulingDate: TypeOrmSchedulingDate): Dates {
        const domain: Dates = {
            id: typeOrmSchedulingDate.id,
            date: typeOrmSchedulingDate.date,
            experts: typeOrmSchedulingDate.experts
        }

        return domain
    }

    public static toDomainEntities(typeOrmSchedulingDate: TypeOrmSchedulingDate[]): Dates[] {
        return typeOrmSchedulingDate.map(typeOrmSchedulingDate => this.toDomainEntity(typeOrmSchedulingDate));
    }
}