import { DbAddScheduling } from "../../data/scheduling/db-add-scheduling";
import { TypeOrmDatesRepository } from "../../infra/db/typeorm/repository/dates/typeorm-dates-repository";
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository";
import { JsDateUtil } from "../../infra/utils/js-date-util";
import { CreateScheduling } from "../../presentation/controllers/scheduling/create-scheduling";

export const createSchedulingController = (): CreateScheduling => {
    const typeOrmSchedulingRepository = new TypeOrmSchedulingRepository()
    const typeOrmDatesRepository = new TypeOrmDatesRepository()
    const jsDateUtil = new JsDateUtil()

    const addScheduling = new DbAddScheduling(typeOrmSchedulingRepository,typeOrmDatesRepository,jsDateUtil)

    return new CreateScheduling(addScheduling)
}