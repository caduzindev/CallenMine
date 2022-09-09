import { Dates } from "../../domain/entities/scheduling"

export interface DatesRepository {
    add(data:{scheduling_id: number,date: string}): Promise<number>
    addExpertToDate(data:{scheduling_date_id: number,expert_id: number}): Promise<void>
    datesOccupiedByExpert(data: { expert_id: number,period: { start: string,end:string } }): Promise<Dates[]>
}