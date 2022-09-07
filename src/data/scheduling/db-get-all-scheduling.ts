import { Scheduling } from "../../domain/entities/scheduling";
import { GetAllScheduling } from "../../domain/usecases/get-all-scheduling";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbGetAllScheduling implements GetAllScheduling {
    constructor (private readonly schedulingRepository: SchedulingRepository) {}
    async getAll(): Promise<boolean | Scheduling[]> {
        const schedules = await this.schedulingRepository.getAll()

        if (!schedules) return false

        return schedules
    }
}