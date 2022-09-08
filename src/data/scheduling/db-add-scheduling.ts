import { AddScheduling, AddSchedulingDto } from "../../domain/usecases/add-scheduling";
import { DatesRepository } from "../protocols/dates-repository";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbAddScheduling implements AddScheduling {
    constructor (
        private readonly schedulingRepository: SchedulingRepository,
        private readonly datesRepository: DatesRepository
    ) {}
    async add(data: AddSchedulingDto): Promise<string> {
        const schedule_id = await this.schedulingRepository.add({customer_document: data.customer,note: data.note})

        for (const schedulingDate of data.schedules) {
            const scheduling_date_id = await this.datesRepository.add({
                date: schedulingDate.date,
                scheduling_id: Number(schedule_id),
            })
            for (const expert of schedulingDate.experts_id) {
                await this.datesRepository.addExpertToDate({
                    scheduling_date_id: Number(scheduling_date_id),
                    expert_id: expert
                })
            }
        }

        return schedule_id
    }
}