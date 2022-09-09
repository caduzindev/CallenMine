import { Expert } from "../../domain/entities/expert";

export interface ExpertRepository {
    getAllExpertAvailable(date: string): Promise<Expert[]>
}