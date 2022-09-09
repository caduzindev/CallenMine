import { Not } from "typeorm";
import { ExpertRepository } from "../../../../../data/protocols/expert-repository";
import { Expert } from "../../../../../domain/entities/expert";
import { TypeOrmExpert } from "../../entity/typeorm-expert";
import { AppDataSource } from "../../helper/app-data-source";
import { Mapper } from "./mapper";

export class TypeOrmExpertRepository implements ExpertRepository {
    async getAllExpertAvailable(date: string): Promise<Expert[]> {
        const experts = await AppDataSource.getInstance()
            .getRepository(TypeOrmExpert)
            .query(`
                select distinct "id","name","expertises" from expert ex
                    join scheduling_date_expert sde on sde.expert_id=ex.id
                where '${date}' not in (
                    select sd.date from scheduling_date_expert sde
                        join scheduling_date sd on sd.id=sde.scheduling_date_id
                    where sde.expert_id=ex.id
                );
                `
            )

        const domainExperts = Mapper.toDomainEntities(experts)
        return domainExperts
    }
}