import { In } from "typeorm";
import { ExpertRepository } from "../../../../../data/protocols/expert-repository";
import { Expert } from "../../../../../domain/entities/expert";
import { TypeOrmExpert } from "../../entity/typeorm-expert";
import { AppDataSource } from "../../helper/app-data-source";

export class TypeOrmExpertRepository implements ExpertRepository {
    async getByIds(ids: number[]): Promise<Expert[]> {
        const experts = await AppDataSource.getInstance()
            .getRepository(TypeOrmExpert)
            .find({
                where: {
                    id: In(ids)
                }
            })

        return experts
    }
}