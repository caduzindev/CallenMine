import { Router } from "express"
import { adaptRoute } from "../adapters/express-routes-adapter"
import { getCustomerController } from "../factories/get-customer-controller"

export default (router: Router): void => {
    router.get('/customer/:document',adaptRoute(getCustomerController()))
}