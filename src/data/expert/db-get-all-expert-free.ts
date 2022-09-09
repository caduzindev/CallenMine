import { Expert } from "../../domain/entities/expert";
import { GetAllExpertFree } from "../../domain/usecases/get-all-expert-free";
import { BlockRepository } from "../protocols/block-repository";
import { DateUtil } from "../protocols/date-util";
import { ExpertRepository } from "../protocols/expert-repository";

export class DbGetAllExpertFree implements GetAllExpertFree {
    constructor (
        private readonly expertRepository: ExpertRepository,
        private readonly blockRepository: BlockRepository,
        private readonly dateUtil: DateUtil
    ) {}
    async getAll(date: string): Promise<boolean | Expert[]> {
        const dateFormat = this.dateUtil.converterToIso(date)
        const existsBlock = await this.blockRepository.existisBlockInDate(dateFormat)

        if (existsBlock) return false

        const experts = await this.expertRepository.getAllExpertAvailable(date)

        if (experts.length <= 0) return false

        return experts
    }
}