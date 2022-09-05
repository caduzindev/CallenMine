import { Block } from "../entities/scheduling";

export interface GetAllBlock {
    getAll(): Promise<Block[]>
}