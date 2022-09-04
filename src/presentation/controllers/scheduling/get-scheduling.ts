import { GetInfoScheduling } from "../../../domain/usecases/get-info-scheduling";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class GetScheduling implements Controller{
    constructor (private readonly getInfoScheduling:GetInfoScheduling){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.params.scheduling_id ) return { statusCode: 400, data: 'scheduling_id not informed' }
        const scheduling = await this.getInfoScheduling.get(httpRequest.params.scheduling_id)

        if (!scheduling) return {statusCode: 404, data:{}}

        return {
            statusCode: 200,
            data: scheduling
        }
    }
}