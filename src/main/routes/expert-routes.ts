import { Router } from "express"
import { adaptRoute } from "../adapters/express-routes-adapter"
import { allExpertFreeController } from "../factories/all-expert-free-controller"
import { allExpertOccupiedController } from "../factories/all-expert-occupied-controller"
import { allExpertSchedulesController } from "../factories/all-expert-schedules-controller"
import { createSchedulingController } from "../factories/create-scheduling-controller"

export default (router: Router): void => {
    router.post('/expert/scheduling',adaptRoute(createSchedulingController()))
    router.get('/expert/scheduling/:expert_id',adaptRoute(allExpertSchedulesController()))
    router.get('/expert/occupied/:expert_id',adaptRoute(allExpertOccupiedController()))
    router.get('/expert/free',adaptRoute(allExpertFreeController()))
}