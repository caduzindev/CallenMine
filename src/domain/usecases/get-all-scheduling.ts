import { Scheduling } from "../entities/scheduling";

export interface GetAllScheduling{
    getAll(): Promise<Scheduling[]|boolean>
}