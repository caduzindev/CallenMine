import { Between } from "typeorm";
import { BlockRepository } from "../../../../../data/protocols/block-repository";
import { Block } from "../../../../../domain/entities/scheduling";
import { TypeOrmBlock } from "../../entity/typeorm-block";
import { AppDataSource } from "../../helper/app-data-source";
import { Mapper } from "./mapper";

export class TypeOrmBlockRepository implements BlockRepository {
    async getBlocksPerPeriod(period: { start: string,end: string }): Promise<Block[]> {
        const blocks = await AppDataSource.getInstance()
            .getRepository(TypeOrmBlock)
            .find({
                where: [
                    {start_date: Between(period.start,period.end)},
                    {end_date: Between(period.start,period.end)}
                ]
            })

        const domainBlocks = Mapper.toDomainEntities(blocks)

        return domainBlocks
    }
}