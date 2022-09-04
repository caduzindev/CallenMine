import { GetExpertSchedules } from "../../../domain/usecases/get-expert-schedules";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AllExpertSchedules implements Controller{
    constructor(private readonly getSchedulesExpert: GetExpertSchedules){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.params.expert_id) return { statusCode:400,data: 'expert_id is required' }
        const schedules = await this.getSchedulesExpert.getAll(httpRequest.params.expert_id)

        return {
            statusCode: 200,
            data: schedules
        }
    }
}