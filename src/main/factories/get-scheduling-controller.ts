import { DbGetInfoScheduling } from "../../data/scheduling/db-get-info-scheduling";
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository";
import { GetScheduling } from "../../presentation/controllers/scheduling/get-scheduling";

export const getSchedulingController = (): GetScheduling => {
    const typeOrmSchedulingRepository = new TypeOrmSchedulingRepository()
    const dbGetInfoScheduling = new DbGetInfoScheduling(typeOrmSchedulingRepository)

    return new GetScheduling(dbGetInfoScheduling)
}