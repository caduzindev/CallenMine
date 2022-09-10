import { Block } from "../../domain/entities/scheduling";
import { GetAllBlock } from "../../domain/usecases/get-all-block";
import { BlockRepository } from "../protocols/block-repository";

export class DbGetAllBlock implements GetAllBlock {
    constructor (private readonly blockRepository: BlockRepository){}
    async getAll(): Promise<Block[]> {
        const blocks = await this.blockRepository.getAll()

        return blocks
    }
}