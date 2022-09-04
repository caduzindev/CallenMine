import { Customer } from "./customer"
import { Expert } from "./expert"

export interface Dates {
    date: string
    experts: Expert[]
}
export interface Scheduling {
    customer: Customer
    note: string
    schedules: Dates[]
}