import { Scheduling } from "../../domain/entities/scheduling";
import { GetExpertSchedulings } from "../../domain/usecases/get-expert-schedulings";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbGetExpertSchedulings implements GetExpertSchedulings {
    constructor (private readonly schedulingRepository: SchedulingRepository) {}
    async getAll(id: string): Promise<Scheduling[]> {
        const schedulings = await this.schedulingRepository.getSchedulingsFromExpert(Number(id))

        return schedulings
    }
}