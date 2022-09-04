import { Scheduling } from "../entities/scheduling";

export interface GetExpertSchedules {
    getAll(id: string): Promise<Scheduling[]>
}