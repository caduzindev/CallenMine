import { DbGetAllExpertFree } from "../../data/expert/db-get-all-expert-free";
import { TypeOrmBlockRepository } from "../../infra/db/typeorm/repository/block/typeorm-block-repository";
import { TypeOrmExpertRepository } from "../../infra/db/typeorm/repository/expert/typeorm-expert-repository";
import { JsDateUtil } from "../../infra/utils/js-date-util";
import { AllExpertFree } from "../../presentation/controllers/expert/all-expert-free";
import { AllExpertFreeValidation } from "../../presentation/helper/validation/yup/schemas/all-expert-free-validation";

export const allExpertFreeController = (): AllExpertFree => {
    const typeOrmExpert = new TypeOrmExpertRepository()
    const typeOrmBlock = new TypeOrmBlockRepository()
    const jsDateUtil = new JsDateUtil()
    const getAllExpertFree = new DbGetAllExpertFree(typeOrmExpert,typeOrmBlock,jsDateUtil)
    const allExpertFreeValidation = new AllExpertFreeValidation()

    return new AllExpertFree(getAllExpertFree,allExpertFreeValidation)
}