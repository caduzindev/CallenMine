import { Expert } from "../../../domain/entities/expert";
import { GetAllExpertFree } from "../../../domain/usecases/get-all-expert-free";
import { AllExpertFree } from "./all-expert-free";

const Sut = () => {
    class GetAllExpertFreeStub implements GetAllExpertFree {
       async getAll(date: string): Promise<Expert[]|boolean> {
           return [
                {
                    name: 'jose',
                    expertises: ['mecanica','matematica']
                }
           ]
       }
    }

    const getAllExpertOccupiedStub = new GetAllExpertFreeStub()
    const sut = new AllExpertFree(getAllExpertOccupiedStub)

    return {
        sut,
        getAllExpertOccupiedStub
    }
}

describe('Test AllExpertFree', () => {
    test('should return 400 if date is not informed',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
            query: {

            }
        }

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 400,
            data: 'date is required'
        })
    })

    test('should return 200 with experts',async ()=>{
        const { sut,getAllExpertOccupiedStub } = Sut()
        const getAll = jest.spyOn(getAllExpertOccupiedStub,"getAll")

        const payload = [
            {
                name: 'jose',
                expertises: ['mecanica','matematica']
            }
        ]

        const httpRequest = {
            query: {
                date: '2022-08-06'
            }
        }

        const result = await sut.handle(httpRequest)

        expect(result.statusCode).toBe(200)
        expect(result.data).toEqual(payload)
        expect(getAll).toBeCalledWith('2022-08-06')
    })

    test('should return 204 if experts are not found on the given date',async ()=>{
        const { sut,getAllExpertOccupiedStub } = Sut()
        const getAll = jest.spyOn(getAllExpertOccupiedStub,"getAll")

        getAll.mockImplementationOnce(async () => false)

        const payload = {}

        const httpRequest = {
            query: {
                date: '2022-08-06'
            }
        }

        const result = await sut.handle(httpRequest)

        expect(result.statusCode).toBe(204)
        expect(result.data).toEqual(payload)
        expect(getAll).toBeCalledWith('2022-08-06')
    })
});