import { Scheduling } from "../../domain/entities/scheduling";
import { GetInfoScheduling } from "../../domain/usecases/get-info-scheduling";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbGetInfoScheduling implements GetInfoScheduling{
    constructor (private readonly schedulingRepository: SchedulingRepository) {}
    async get(id: string): Promise<boolean | Scheduling> {
        const scheduling = await this.schedulingRepository.get(Number(id))

        if (!scheduling) return false

        return scheduling
    }
}