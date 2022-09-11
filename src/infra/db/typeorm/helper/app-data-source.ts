import { DataSource } from "typeorm";
import { TypeOrmBlock } from "../entity/typeorm-block";
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
            host: process.env?.DB_HOST,
            port: Number(process.env?.DB_PORT),
            username: process.env?.DB_USER,
            password: process.env?.DB_PASSWORD,
            database: process.env?.DB_NAME,
            entities: [TypeOrmCustomer, TypeOrmExpert, TypeOrmSchedulingDate, TypeOrmScheduling, TypeOrmBlock],
            synchronize: false,
            logging: false,
        })

        return this.instance
    }
}