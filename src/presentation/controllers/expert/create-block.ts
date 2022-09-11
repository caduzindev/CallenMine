import { AddBlock } from "../../../domain/usecases/add-block";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class CreateBlock implements Controller {
    constructor (
        private readonly addBlock: AddBlock,
        private readonly validation: Validation
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const validate = await this.validation.validate(httpRequest.body)

        if (!validate.valid) return {
            statusCode: 400,
            data: {
                message: validate.message
            }
        }

        const block_id = await this.addBlock.add(httpRequest.body)

        return {
            statusCode: 200,
            data: { block_id }
        }
    }
}