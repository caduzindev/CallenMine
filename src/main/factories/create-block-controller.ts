import { DbAddBlock } from "../../data/block/db-add-block";
import { TypeOrmBlockRepository } from "../../infra/db/typeorm/repository/block/typeorm-block-repository";
import { JsDateUtil } from "../../infra/utils/js-date-util";
import { CreateBlock } from "../../presentation/controllers/expert/create-block";

export const createBlockController = (): CreateBlock => {
    const typeOrmBlockRepository = new TypeOrmBlockRepository()
    const jsDateUtil = new JsDateUtil()
    const dbAddBlock = new DbAddBlock(typeOrmBlockRepository,jsDateUtil)

    return new CreateBlock(dbAddBlock)
}