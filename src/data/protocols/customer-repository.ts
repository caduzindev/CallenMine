import { Customer } from "../../domain/entities/customer";

export interface CustomerRepository {
    get(document: string): Promise<Customer|null>
}