import { DbGetAllScheduling } from "../../data/scheduling/db-get-all-scheduling";
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository";
import { AllScheduling } from "../../presentation/controllers/scheduling/all-scheduling";

export const allSchedulingController = (): AllScheduling => {
    const typeOrmSchedulingRepository = new TypeOrmSchedulingRepository()
    const dbGetAllScheduling = new DbGetAllScheduling(typeOrmSchedulingRepository)

    return new AllScheduling(dbGetAllScheduling)
}