import { Scheduling } from "../entities/scheduling";
export interface GetInfoScheduling{
    get(id: string): Promise<Scheduling|boolean>
}