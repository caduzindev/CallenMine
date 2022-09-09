import { AddBlock, AddBlockDto } from "../../domain/usecases/add-block";
import { BlockRepository } from "../protocols/block-repository";
import { DateUtil } from "../protocols/date-util";

export class DbAddBlock implements AddBlock {
    constructor (
        private readonly blockRepository: BlockRepository,
        private readonly dateUtil: DateUtil
    ) {}
    async add(data: AddBlockDto): Promise<number> {
        return this.blockRepository.add({
            start: this.dateUtil.converterToIso(data.start),
            end: this.dateUtil.converterToIso(data.end),
            note: data.note
        })
    }
}