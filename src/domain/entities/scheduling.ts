import { Customer } from "./customer"
import { Expert } from "./expert"

export interface Dates {
    date: string
    experts: Expert[]
}

export interface Block {
    start_date: string
    end_date: string
    note: string
}
export interface Scheduling {
    customer: Customer
    note: string
    schedules: Dates[]
}