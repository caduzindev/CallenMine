import { Between } from "typeorm";
import { BlockRepository } from "../../../../../data/protocols/block-repository";
import { Block } from "../../../../../domain/entities/scheduling";
import { AddBlockDto } from "../../../../../domain/usecases/add-block";
import { TypeOrmBlock } from "../../entity/typeorm-block";
import { AppDataSource } from "../../helper/app-data-source";
import { Mapper } from "./mapper";

export class TypeOrmBlockRepository implements BlockRepository {
    async add(block: AddBlockDto): Promise<number> {
        let blockSave = new TypeOrmBlock()
        blockSave.start_date = block.start
        blockSave.end_date = block.end
        blockSave.note = block.note

        const result = await AppDataSource.getInstance()
            .getRepository(TypeOrmBlock)
            .save(blockSave)

        return result.id
    }

    async getAll(): Promise<Block[]> {
        const blocks = await AppDataSource.getInstance()
            .getRepository(TypeOrmBlock)
            .find()

        const domainBlocks = Mapper.toDomainEntities(blocks)

        return domainBlocks
    }

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

    async existisBlockInDate(date: string): Promise<Block | null> {
        let domainBlock: Block | null = null

        const block = await AppDataSource.getInstance()
            .getRepository(TypeOrmBlock)
            .query(`select id,start_date,end_date,note from scheduling_block sb where '${date}' between sb.start_date and sb.end_date limit 1;`)

        if (block[0]) {
            domainBlock = Mapper.toDomainEntity(block[0])
        }

        return domainBlock
    }
}