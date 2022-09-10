import { Block } from "../../domain/entities/scheduling";
import { AddBlockDto } from "../../domain/usecases/add-block";

export interface BlockRepository {
    getBlocksPerPeriod(period: { start: string,end:string }): Promise<Block[]>
    existisBlockInDate(date: string): Promise<Block|null>
    add(block: AddBlockDto): Promise<number>
    getAll(): Promise<Block[]>
}