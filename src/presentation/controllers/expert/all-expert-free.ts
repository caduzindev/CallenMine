import { GetAllExpertFree } from "../../../domain/usecases/get-all-expert-free";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class AllExpertFree implements Controller {
    constructor(
        private readonly getAllExpertFree: GetAllExpertFree,
        private readonly validation: Validation
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const validate = await this.validation.validate(httpRequest.query)

        if (!validate.valid) return {
            statusCode: 400,
            data: {
                message: validate.message
            }
        }

        const experts = await this.getAllExpertFree.getAll(httpRequest.query.date)

        if (!experts) return { statusCode: 204, data:{} }

        return {
            statusCode: 200,
            data: experts
        }
    }
}