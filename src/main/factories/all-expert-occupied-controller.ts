import { DbGetAllExpertOccupied } from "../../data/dates/db-get-all-expert-occupied"
import { TypeOrmBlockRepository } from "../../infra/db/typeorm/repository/block/typeorm-block-repository"
import { TypeOrmDatesRepository } from "../../infra/db/typeorm/repository/dates/typeorm-dates-repository"
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository"
import { JsDateUtil } from "../../infra/utils/js-date-util"
import { AllExpertOccupied } from "../../presentation/controllers/expert/all-expert-occupied"

export const allExpertOccupiedController = (): AllExpertOccupied => {
    const typeOrmDatesRepository = new TypeOrmDatesRepository()
    const typeOrmBlockRepository = new TypeOrmBlockRepository()
    const typeOrmScheduling = new TypeOrmSchedulingRepository()
    const jsDateUtil = new JsDateUtil()
    const getAllExpertOccupied = new DbGetAllExpertOccupied(typeOrmDatesRepository,typeOrmBlockRepository,typeOrmScheduling,jsDateUtil)

    return new AllExpertOccupied(getAllExpertOccupied)
}