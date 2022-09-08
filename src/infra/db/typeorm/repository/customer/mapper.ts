import { Customer } from "../../../../../domain/entities/customer";
import { TypeOrmCustomer } from "../../entity/typeorm-customer";

export class Mapper {
    public static toDomainEntity(typeOrmCustomer: TypeOrmCustomer): Customer {
        const domain: Customer = {
            document: typeOrmCustomer.document,
            name: typeOrmCustomer.name
        }

        return domain
    }

    public static toDomainEntities(typeOrmCustomers: TypeOrmCustomer[]): Customer[] {
        return typeOrmCustomers.map(typeOrmCustomers => this.toDomainEntity(typeOrmCustomers));
    }
}