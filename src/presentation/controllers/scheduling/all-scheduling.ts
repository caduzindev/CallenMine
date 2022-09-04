import { GetAllScheduling } from "../../../domain/usecases/get-all-scheduling";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AllScheduling implements Controller {
    constructor(private readonly getAllScheduling: GetAllScheduling){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const schedules = await this.getAllScheduling.getAll()

        return {
            statusCode: 200,
            data: schedules
        }
    }
}