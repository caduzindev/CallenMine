import { Router } from "express"
import { adaptRoute } from "../adapters/express-routes-adapter"
import { createSchedulingController } from "../factories/create-scheduling-controller"

export default (router: Router): void => {
    router.post('/expert/scheduling',adaptRoute(createSchedulingController()))
}