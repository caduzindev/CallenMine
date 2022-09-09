export interface AddSchedulingDto {
    customer: string
    note: string
    schedules: Array<{date: string,experts_id: number[]}>
}
export interface AddScheduling {
    add(data: AddSchedulingDto): Promise<number>
}