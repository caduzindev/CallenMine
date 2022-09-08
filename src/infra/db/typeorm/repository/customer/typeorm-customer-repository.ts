import { CustomerRepository } from "../../../../../data/protocols/customer-repository";
import { Customer } from "../../../../../domain/entities/customer";
import { TypeOrmCustomer } from "../../entity/typeorm-customer";
import { AppDataSource } from "../../helper/app-data-source";
import { Mapper } from "./mapper";

export class TypeOrmCustomerRepository implements CustomerRepository {
    async get(document: string): Promise<Customer|null> {
        let customer: Customer | null = null

        const result = await AppDataSource.getInstance()
            .getRepository(TypeOrmCustomer)
            .findOneBy({ document: document })

        if (result) customer = Mapper.toDomainEntity(result)

        return customer
    }
}