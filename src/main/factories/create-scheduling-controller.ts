import { DbAddScheduling } from "../../data/scheduling/db-add-scheduling";
import { TypeOrmDatesRepository } from "../../infra/db/typeorm/repository/dates/typeorm-dates-repository";
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository";
import { CreateScheduling } from "../../presentation/controllers/scheduling/create-scheduling";

export const createSchedulingController = (): CreateScheduling => {
    const typeOrmSchedulingRepository = new TypeOrmSchedulingRepository()
    const typeOrmDatesRepository = new TypeOrmDatesRepository()

    const addScheduling = new DbAddScheduling(typeOrmSchedulingRepository,typeOrmDatesRepository)

    return new CreateScheduling(addScheduling)
}