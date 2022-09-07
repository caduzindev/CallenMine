import { DataSource } from "typeorm";
import { TypeOrmCustomer } from "../entity/typeorm-customer";
import { TypeOrmExpert } from "../entity/typeorm-expert";
import { TypeOrmScheduling } from "../entity/typeorm-scheduling";
import { TypeOrmSchedulingDate } from "../entity/typeorm-scheduling-date";

export class AppDataSource {
    private static instance: DataSource

    static getInstance(): DataSource {
        if (this.instance) return this.instance
        this.instance = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5433,
            username: "postgres",
            password: "root",
            database: "teste",
            entities: [TypeOrmCustomer,TypeOrmExpert,TypeOrmSchedulingDate,TypeOrmScheduling],
            synchronize: false,
            logging: false,
        })

        return this.instance
    }
}