import { DbGetExpertSchedulings } from "../../data/scheduling/db-get-expert-schedulings";
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository";
import { AllExpertSchedules } from "../../presentation/controllers/expert/all-expert-schedules";

export const allExpertSchedulesController = (): AllExpertSchedules => {
    const typeOrmSchedulingRepository = new TypeOrmSchedulingRepository()
    const getExpertSchedulings = new DbGetExpertSchedulings(typeOrmSchedulingRepository)

    return new AllExpertSchedules(getExpertSchedulings)
}