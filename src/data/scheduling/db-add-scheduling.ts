import { AddScheduling, AddSchedulingDto } from "../../domain/usecases/add-scheduling";
import { DateUtil } from "../protocols/date-util";
import { DatesRepository } from "../protocols/dates-repository";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbAddScheduling implements AddScheduling {
    constructor (
        private readonly schedulingRepository: SchedulingRepository,
        private readonly datesRepository: DatesRepository,
        private readonly dateUtil: DateUtil
    ) {}
    async add(data: AddSchedulingDto): Promise<string> {
        const initialDate = this.dateUtil.converterToIso(data.schedules[0].date)

        if (
            this.dateUtil.differenceBetweenDates(new Date(initialDate), new Date()) > 90
        ) {
            throw new Error('Primeiro agendamento não pode ser maior que 90 dias')
        }

        for (const schedulingDate of data.schedules) {
           if (this.dateUtil.differenceBetweenDates(new Date(schedulingDate.date), new Date()) < 0) {
            throw new Error('Data de agendamento não pode ser menor que a data atual')
           }
        }

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