import { Customer } from "./customer"
import { Expert } from "./expert"
export interface Dates {
    id: number
    date: string
    experts: Expert[]
}

export interface Block {
    id: number
    start_date: string
    end_date: string
    note: string
}
export interface Scheduling {
    id: number
    customer: Customer
    note: string
    schedules: Dates[]
}