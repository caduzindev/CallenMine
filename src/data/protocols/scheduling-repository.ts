import { Scheduling } from "../../domain/entities/scheduling";

export interface SchedulingRepository {
    getAll(): Promise<Scheduling[]>
}