import { Block } from "../../../domain/entities/scheduling"
import { GetAllBlock } from "../../../domain/usecases/get-all-block"
import { AllBlock } from "./all-block"

const Sut = () => {
    class GetAllBlockStub implements GetAllBlock {
       async getAll(): Promise<Block[]> {
           return [
            {
                start_date: '2022-05-06',
                end_date: '2022-05-06',
                note: 'blabla'
            }
           ]
       }
    }

    const getAllBlockStub = new GetAllBlockStub()
    const sut = new AllBlock(getAllBlockStub)

    return {
        sut,
        getAllBlockStub
    }
}

describe('Test AllBlock', () => {
    test('should return 200 with experts',async ()=>{
        const { sut } = Sut()

        const payload = [
            {
                start_date: '2022-05-06',
                end_date: '2022-05-06',
                note: 'blabla'
            }
        ]

        const httpRequest = {
            body: payload
        }

        const result = await sut.handle(httpRequest)

        expect(result.statusCode).toBe(200)
        expect(result.data).toEqual(payload)
    })
});