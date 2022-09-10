import { Customer } from "../../domain/entities/customer";
import { GetInfoCustomer } from "../../domain/usecases/get-info-customer";
import { CustomerRepository } from "../protocols/customer-repository";

export class DbGetInfoCustomer implements GetInfoCustomer {
    constructor(private readonly customerRepository: CustomerRepository){}
    async get(document: string): Promise<boolean | Customer> {
        const customer = await this.customerRepository.get(document)

        if (!customer) return false

        return customer
    }
}