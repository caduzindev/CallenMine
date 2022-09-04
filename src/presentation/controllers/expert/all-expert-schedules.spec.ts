import { Scheduling } from "../../../domain/entities/scheduling";
import { GetExpertSchedules } from "../../../domain/usecases/get-expert-schedules";
import { AllExpertSchedules } from "./all-expert-schedules";

const Sut = () => {
    class GetExpertSchedulesStub implements GetExpertSchedules {
        async getAll(id: string): Promise<Scheduling[]> {
            return [{
                customer: {
                    document: "document",
                    name: ''
                },
                note: "blabla",
                schedules: [{
                    date: '2022-01-01',
                    experts: [
                        {
                            name: "paulo",
                            expertises: ["canva","photoshop"]
                        },
                        {
                            name: "marcola",
                            expertises: ["programação", "design"]
                        }
                    ]
                }]
            }]
        }
    }

    const getExpertSchedulesStub = new GetExpertSchedulesStub()
    const sut = new AllExpertSchedules(getExpertSchedulesStub)

    return {
        sut,
        getExpertSchedulesStub
    }
}

describe('Test GetExpertSchedule', () => {
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

    test('should return 200 with schedules',async ()=>{
        const { sut,getExpertSchedulesStub } = Sut()
        const getAll = jest.spyOn(getExpertSchedulesStub,"getAll")
        const payload = [
            {
                customer: {
                    document: "document",
                    name: ''
                },
                note: "blabla",
                schedules: [{
                    date: '2022-01-01',
                    experts: [
                        {
                            name: "paulo",
                            expertises: ["canva","photoshop"]
                        },
                        {
                            name: "marcola",
                            expertises: ["programação", "design"]
                        }
                    ]
                }]
            }
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