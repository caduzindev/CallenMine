import { AddScheduling } from "../../../domain/usecases/add-scheduling";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class CreateScheduling implements Controller {
    constructor (private readonly addScheduling: AddScheduling){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const request = httpRequest.body

            if (!request.customer) return {statusCode: 400,data: "customer is required"}
            if (!request.note) return {statusCode: 400,data: "note is required"}
            if (!request.schedules) return {statusCode: 400,data: "schedules is required"}

            const schedule_id = await this.addScheduling.add(request)

            return {
                statusCode: 200,
                data: { schedule_id }
            }
        } catch (err) {
            return {
                statusCode: 400,
                data: {
                    message: err.message
                }
            }
        }
    }
}