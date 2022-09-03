import { Customer } from "../entities/customer";

export interface GetInfoCustomer {
    get(document: string): Promise<Customer|boolean>
}