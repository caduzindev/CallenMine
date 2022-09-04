import { GetAllExpertOccupied } from "../../../domain/usecases/get-all-expert-occupied";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AllExpertOccupied implements Controller {
    constructor(private readonly getAllExpertOccupied: GetAllExpertOccupied){}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.params.expert_id) return { statusCode:400,data: 'expert_id is required' }

        const datesOccupied = await this.getAllExpertOccupied.getAll(httpRequest.params.expert_id)

        return {
            statusCode: 200,
            data: datesOccupied
        }
    }
}