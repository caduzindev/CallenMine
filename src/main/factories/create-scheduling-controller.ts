import { DbAddScheduling } from "../../data/scheduling/db-add-scheduling";
import { TypeOrmDatesRepository } from "../../infra/db/typeorm/repository/dates/typeorm-dates-repository";
import { TypeOrmExpertRepository } from "../../infra/db/typeorm/repository/expert/typeorm-expert-repository";
import { TypeOrmSchedulingRepository } from "../../infra/db/typeorm/repository/scheduling/typeorm-scheduling-repository";
import { JsDateUtil } from "../../infra/utils/js-date-util";
import { JsDocumentUtil } from "../../infra/utils/js-document-util";
import { CreateScheduling } from "../../presentation/controllers/scheduling/create-scheduling";
import { CreateSchedulingValidation } from "../../presentation/helper/validation/yup/create-scheduling-validation";

export const createSchedulingController = (): CreateScheduling => {
    const typeOrmSchedulingRepository = new TypeOrmSchedulingRepository()
    const typeOrmDatesRepository = new TypeOrmDatesRepository()
    const typeOrmExpertRepository = new TypeOrmExpertRepository()
    const jsDateUtil = new JsDateUtil()
    const jsDocumentUtil = new JsDocumentUtil()

    const addScheduling = new DbAddScheduling(
        typeOrmSchedulingRepository,
        typeOrmDatesRepository,
        typeOrmExpertRepository,
        jsDateUtil,
        jsDocumentUtil
    )
    const createSchedulingValidation = new CreateSchedulingValidation()

    return new CreateScheduling(addScheduling, createSchedulingValidation)
}