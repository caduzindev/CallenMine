import { GetAllExpertFree } from "../../../domain/usecases/get-all-expert-free";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AllExpertFree implements Controller {
    constructor(private readonly getAllExpertFree: GetAllExpertFree){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.query.date) return { statusCode: 400, data: 'date is required' }

        const experts = await this.getAllExpertFree.getAll(httpRequest.query.date)

        if (!experts) return { statusCode: 204, data:{} }

        return {
            statusCode: 200,
            data: experts
        }
    }
}