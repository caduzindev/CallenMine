import { AddBlock } from "../../../domain/usecases/add-block";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class CreateBlock implements Controller {
    constructor (private readonly addBlock: AddBlock){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const block_id = await this.addBlock.add(httpRequest.body)

        return {
            statusCode: 200,
            data: { block_id }
        }
    }
}