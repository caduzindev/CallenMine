import { GetAllBlock } from "../../../domain/usecases/get-all-block";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AllBlock implements Controller {
    constructor (private readonly getAllBlock: GetAllBlock) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const blocks = await this.getAllBlock.getAll()

        return {
            statusCode: 200,
            data: blocks
        }
    }
}