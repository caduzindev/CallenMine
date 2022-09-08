import { GetExpertSchedulings } from "../../../domain/usecases/get-expert-schedulings";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AllExpertSchedules implements Controller{
    constructor(private readonly getExpertSchedulings: GetExpertSchedulings){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.params.expert_id) return { statusCode:400,data: 'expert_id is required' }
        const schedules = await this.getExpertSchedulings.getAll(httpRequest.params.expert_id)

        return {
            statusCode: 200,
            data: schedules
        }
    }
}