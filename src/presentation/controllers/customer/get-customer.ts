import { GetInfoCustomer } from "../../../domain/usecases/get-info-customer";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class GetCustomer implements Controller {
    constructor(private readonly getInfoCustomer: GetInfoCustomer) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const customer = await this.getInfoCustomer.get(httpRequest.params.document)

        if (!customer) return {statusCode: 404, data:{}}

        return {
            statusCode: 200,
            data: customer
        }
    }
}