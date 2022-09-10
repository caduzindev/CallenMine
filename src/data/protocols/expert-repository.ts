import { Expert } from "../../domain/entities/expert";

export interface ExpertRepository {
    getAllExpertAvailable(date: string): Promise<Expert[]>
    expertHasScheduleForDate(data: { expert_id: number, date: string }): Promise<boolean>
}