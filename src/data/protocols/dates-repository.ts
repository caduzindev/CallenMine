export interface DatesRepository {
    add(data:{scheduling_id: number,date: string}): Promise<string>
    addExpertToDate(data:{scheduling_date_id: number,expert_id: number}): Promise<void>
}