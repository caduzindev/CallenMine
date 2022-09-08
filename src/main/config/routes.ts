import { Router, Express } from "express"
import expertRoutes from "../routes/expert-routes"
import schedulingRoutes from "../routes/scheduling-routes"
export default (app: Express): void => {
    const router = Router()
    app.use('/',router)

    schedulingRoutes(router)
    expertRoutes(router)
}