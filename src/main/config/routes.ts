import { Router, Express } from "express"
import schedulingRoutes from "../routes/scheduling-routes"
export default (app: Express): void => {
    const router = Router()
    app.use('/',router)

    schedulingRoutes(router)
}