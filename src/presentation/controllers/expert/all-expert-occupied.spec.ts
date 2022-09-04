import { GetAllExpertOccupied } from "../../../domain/usecases/get-all-expert-occupied"
import { AllExpertOccupied } from "./all-expert-occupied";

const Sut = () => {
    class GetAllExpertOccupiedStub implements GetAllExpertOccupied {
        async getAll(export_id: string): Promise<{ date: string; type: string; message: string }[]> {
            return [
                { date: "dd-MM-YYYY", type: "scheduling", message:"Nome do cliente" },
                { date: "dd-MM-YYYY", type: "blocking", message:"Nota do bloqueio" }
            ]
        }
    }

    const getAllExpertOccupiedStub = new GetAllExpertOccupiedStub()
    const sut = new AllExpertOccupied(getAllExpertOccupiedStub)

    return {
        sut,
        getAllExpertOccupiedStub
    }
}

describe('Test AllExpertOccupied', () => {
     test('should return 400 if expert_id is not informed',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
            params: {

            }
        }

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 400,
            data: 'expert_id is required'
        })
    })

    test('should return 200 with unavailable dates',async ()=>{
        const { sut,getAllExpertOccupiedStub } = Sut()
        const getAll = jest.spyOn(getAllExpertOccupiedStub,"getAll")

        const payload = [
            { date: "dd-MM-YYYY", type: "scheduling", message:"Nome do cliente" },
            { date: "dd-MM-YYYY", type: "blocking", message:"Nota do bloqueio" }
        ]

        const httpRequest = {
            params: {
                expert_id: 'expert_id'
            }
        }

        const result = await sut.handle(httpRequest)

        expect(result.statusCode).toBe(200)
        expect(result.data).toEqual(payload)
        expect(getAll).toBeCalledWith('expert_id')
    })
});