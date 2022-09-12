import { ApiHolidaysDtoReturn } from "../../data/protocols/api-holidays";
import { Expert } from "../entities/expert";

export interface GetAllExpertFree {
    getAll(date: string): Promise<Expert[]|boolean|ApiHolidaysDtoReturn[]>
}