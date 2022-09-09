import { GetAllExpertOccupied, GetAllExpertOccupiedDtoReturn } from "../../domain/usecases/get-all-expert-occupied";
import { BlockRepository } from "../protocols/block-repository";
import { DateUtil } from "../protocols/date-util";
import { DatesRepository } from "../protocols/dates-repository";
import { SchedulingRepository } from "../protocols/scheduling-repository";

export class DbGetAllExpertOccupied implements GetAllExpertOccupied {
    constructor (
        private readonly datesRepository: DatesRepository,
        private readonly blockRepository: BlockRepository,
        private readonly schedulingRepository: SchedulingRepository,
        private readonly dateUtil: DateUtil
    ) {}
    async getAll(export_id: string): Promise<GetAllExpertOccupiedDtoReturn[]> {
        const result:GetAllExpertOccupiedDtoReturn[] = []

        const dateNow = this.dateUtil.converterToIso(new Date().toString())
        const date90Days = this.dateUtil.addDaysToDate(dateNow, 90)

        const datesExpert = await this.datesRepository.datesOccupiedByExpert({
            expert_id: Number(export_id),
            period: {
                start: dateNow,
                end: date90Days
            }
        })

        for (const date of datesExpert) {
            const scheduling = await this.schedulingRepository.getSchedulingFromDate(date.id)
            if (!scheduling) throw new Error(`Não existe agendamento para a data ${date.date}`)
            result.push({
                date: date.date,
                type: 'scheduling',
                message: scheduling.note
            })
        }

        const blocks = await this.blockRepository.getBlocksPerPeriod({start: dateNow,end: date90Days})
        for (const block of blocks) {
            if (
                this.dateUtil.isBefore(block.start_date,dateNow)
                &&
                (
                    this.dateUtil.isBefore(block.start_date,dateNow)
                    ||
                    this.dateUtil.equals(block.end_date,date90Days)
                )
            ) {
                const datesArray = this.dateUtil.arrayRangeDates(dateNow,block.end_date)
                datesArray.forEach(dateString=>{
                    result.push({
                        date: dateString,
                        type: 'blocking',
                        message: block.note
                    })
                })

                continue
            }

            if (
                (this.dateUtil.isBefore(dateNow,block.start_date)
                ||
                this.dateUtil.equals(block.start_date,dateNow))
                &&
                (this.dateUtil.isBefore(date90Days,block.end_date))
            ) {
                const datesArray = this.dateUtil.arrayRangeDates(block.start_date,date90Days)
                datesArray.forEach(dateString=>{
                    result.push({
                        date: dateString,
                        type: 'blocking',
                        message: block.note
                    })
                })

                continue
            }

            const datesArray = this.dateUtil.arrayRangeDates(block.start_date,block.end_date)

            datesArray.forEach(dateString=>{
                result.push({
                    date: dateString,
                    type: 'blocking',
                    message: block.note
                })
            })
        }



        return result
    }
}