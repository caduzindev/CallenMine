import { Customer } from "./customer"

export interface Scheduling {
    customer: Customer
    note: string
    schedules: Date[]
}