import { Scheduling } from "../entities/scheduling";

export interface GetExpertSchedulings {
    getAll(id: string): Promise<Scheduling[]>
}