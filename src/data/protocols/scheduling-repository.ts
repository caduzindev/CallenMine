import { Scheduling } from "../../domain/entities/scheduling";

export interface SchedulingRepository {
    getAll(): Promise<Scheduling[]>
    get(id: number): Promise<Scheduling|null>
    add(data: {customer_document: string,note: string}): Promise<number>
    getSchedulingsFromExpert(expert_id: number): Promise<Scheduling[]>
    getSchedulingFromDate(scheduling_date_id: number): Promise<Scheduling|null>
}