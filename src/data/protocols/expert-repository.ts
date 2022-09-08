import { Expert } from "../../domain/entities/expert";

export interface ExpertRepository {
    getByIds(ids: number[]): Promise<Expert[]>
}