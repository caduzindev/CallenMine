import { Router } from "express"
import { adaptRoute } from "../adapters/express-routes-adapter"
import { allSchedulingController } from "../factories/all-scheduling-controller"
import { getSchedulingController } from "../factories/get-scheduling-controller"

export default (router: Router): void => {
    router.get('/scheduling',adaptRoute(allSchedulingController()))
    router.get('/scheduling/:scheduling_id', adaptRoute(getSchedulingController()))
}