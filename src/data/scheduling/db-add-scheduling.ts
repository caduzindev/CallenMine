import { AddScheduling, AddSchedulingDto } from "../../domain/usecases/add-scheduling";
import { CustomerRepository } from "../protocols/customer-repository";
import { DateUtil } from "../protocols/date-util";
import { DatesRepository } from "../protocols/dates-repository";
import { DocumentUtil } from "../protocols/document-util";
import { ExpertRepository } from "../protocols/expert-repository";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbAddScheduling implements AddScheduling {
    constructor (
        private readonly schedulingRepository: SchedulingRepository,
        private readonly datesRepository: DatesRepository,
        private readonly expertRepository: ExpertRepository,
        private readonly customerRepository: CustomerRepository,
        private readonly dateUtil: DateUtil,
        private readonly documentUtil: DocumentUtil
    ) {}
    async add(data: AddSchedulingDto): Promise<number> {
        const customer = this.documentUtil.removeNonDigitis(data.customer)
        const initialDate = this.dateUtil.converterToIso(data.schedules[0].date)

        if (!await this.customerRepository.get(customer)) throw new Error(`customer ${data.customer} not found`)

        if (
            this.dateUtil.differenceBetweenDates(new Date(initialDate), new Date()) > 90
        ) {
            throw new Error('The first appointment cannot be longer than 90 days')
        }

        for (const schedulingDate of data.schedules) {
           if (this.dateUtil.differenceBetweenDates(new Date(schedulingDate.date), new Date()) < 0) {
            throw new Error('Scheduling date cannot be less than the current date')
           }

           for (const expert of schedulingDate.experts_id) {
                const exists = await this.expertRepository.expertHasScheduleForDate({
                    expert_id: expert,
                    date: schedulingDate.date
                })

                if (exists) throw Error(`There is already an appointment on the date ->${schedulingDate.date}<- for the specialist ->${expert}<-`)
            }
        }

        const schedule_id = await this.schedulingRepository.add({
            customer_document: customer,
            note: data.note
        })

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