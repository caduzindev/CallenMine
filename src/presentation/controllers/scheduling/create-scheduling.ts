import { AddScheduling } from "../../../domain/usecases/add-scheduling";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class CreateScheduling implements Controller {
    constructor (
        private readonly addScheduling: AddScheduling,
        private readonly validation: Validation
    ){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const validate = await this.validation.validate(httpRequest.body)

            if (!validate.valid) return { statusCode: 400, data: { message: validate.message } }

            const schedule_id = await this.addScheduling.add(httpRequest.body)

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