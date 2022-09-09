import { Block } from "../../domain/entities/scheduling";

export interface BlockRepository {
    getBlocksPerPeriod(period: { start: string,end:string }): Promise<Block[]>
    existisBlockInDate(date: string): Promise<Block|null>
}