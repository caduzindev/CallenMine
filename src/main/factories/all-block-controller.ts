import { DbGetAllBlock } from "../../data/block/db-get-all-block";
import { TypeOrmBlockRepository } from "../../infra/db/typeorm/repository/block/typeorm-block-repository";
import { AllBlock } from "../../presentation/controllers/expert/all-block";

export const allBlockController = (): AllBlock => {
    const typeOrmBlockRepository = new TypeOrmBlockRepository()
    const dbGetAllBlock = new DbGetAllBlock(typeOrmBlockRepository)

    return new AllBlock(dbGetAllBlock)
}