import { ApiHolidays } from "../../../data/protocols/api-holidays";
import { GetAllExpertFree } from "../../../domain/usecases/get-all-expert-free";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class AllExpertFree implements Controller {
    constructor(
        private readonly getAllExpertFree: GetAllExpertFree,
        private readonly validation: Validation,
        private readonly apiHolidays: ApiHolidays
    ){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const validate = await this.validation.validate(httpRequest.query)

        if (!validate.valid) return {
            statusCode: 400,
            data: {
                message: validate.message
            }
        }
        const holiday = await this.apiHolidays.getHoliday(httpRequest.query.date)

        if (holiday.length > 0) return {
            statusCode: 200,
            data: holiday
        }
        const experts = await this.getAllExpertFree.getAll(httpRequest.query.date)

        if (!experts) return { statusCode: 204, data:{} }

        return {
            statusCode: 200,
            data: experts
        }
    }
}