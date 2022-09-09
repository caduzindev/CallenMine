import { Block } from "../../../../../domain/entities/scheduling";
import { TypeOrmBlock } from "../../entity/typeorm-block";

export class Mapper {
    public static toDomainEntity(typeOrmBlock: TypeOrmBlock): Block {
        const domain: Block = {
            start_date: typeOrmBlock.start_date,
            end_date: typeOrmBlock.end_date,
            note: typeOrmBlock.note
        }

        return domain
    }

    public static toDomainEntities(typeOrmBlock: TypeOrmBlock[]): Block[] {
        return typeOrmBlock.map(typeOrmBlock => this.toDomainEntity(typeOrmBlock));
    }
}