import { DbGetInfoCustomer } from "../../data/customer/db-get-info-customer";
import { TypeOrmCustomerRepository } from "../../infra/db/typeorm/repository/customer/typeorm-customer-repository";
import { GetCustomer } from "../../presentation/controllers/customer/get-customer";

export const getCustomerController = (): GetCustomer => {
    const typeOrmCustomerRepository = new TypeOrmCustomerRepository()
    const dbGetInfoCustomer = new DbGetInfoCustomer(typeOrmCustomerRepository)

    return new GetCustomer(dbGetInfoCustomer)
}