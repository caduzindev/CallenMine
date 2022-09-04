import { Scheduling } from "../../../domain/entities/scheduling"
import { GetInfoScheduling } from "../../../domain/usecases/get-info-scheduling"
import { GetScheduling } from "./get-scheduling"

const Sut = ()=>{
    class GetSchedulingStub implements GetInfoScheduling {
        get(id: string): Promise<boolean | Scheduling> {
            return new Promise(resolve => resolve(
            {
                customer: {
                    document: "document",
                    name: ''
                },
                note: "blabla",
                schedules: [{
                    date: '2022-01-01',
                    experts: [{
                        name: "paulo",
                        expertises: ["canva","photoshop"]
                    }]
                }]
            }))
        }
    }
    const getSchedulingStub = new GetSchedulingStub()
    const sut = new GetScheduling(getSchedulingStub)

    return {
        sut,
        getSchedulingStub
    }
}

describe('Test GetScheduling',()=>{
    test('should returns 404 if scheduling not found',async ()=>{
        const { sut, getSchedulingStub } = Sut()
        const getScheduling = jest.spyOn(getSchedulingStub,'get')

        const httpRequest = {
            params: {
                scheduling_id: 'blabla'
            }
        }

        getScheduling.mockImplementationOnce(()=>new Promise((resolve)=>resolve(false)))

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 404,
            data: {}
        })
    })

    test('should return 200 if scheduling was found',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
            params: {
                scheduling_id: 'blabla'
            }
        }

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 200,
            data: {
                customer: {
                    document: "document",
                    name: ''
                },
                note: "blabla",
                schedules: [{
                    date: '2022-01-01',
                    experts: [{
                        name: "paulo",
                        expertises: ["canva","photoshop"]
                    }]
                }]
            }
        })
    })

    test('should return 400 if scheduling_id is not informed',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
            params: {

            }
        }

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 400,
            data: 'scheduling_id not informed'
        })
    })
})