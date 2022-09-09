import { Expert } from "../../../../../domain/entities/expert";
import { TypeOrmExpert } from "../../entity/typeorm-expert";

export class Mapper {
    public static toDomainEntity(typeOrmExpert: TypeOrmExpert): Expert {
        const domain: Expert = {
            id: typeOrmExpert.id,
            name: typeOrmExpert.name,
            expertises: typeOrmExpert.expertises
        }

        return domain
    }

    public static toDomainEntities(typeOrmExperts: TypeOrmExpert[]): Expert[] {
        return typeOrmExperts.map(typeOrmExperts => this.toDomainEntity(typeOrmExperts));
    }
}