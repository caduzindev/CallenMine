import { AllScheduling } from "./all-scheduling"
import { GetAllScheduling } from '../../../domain/usecases/get-all-scheduling'
import { Scheduling } from "../../../domain/entities/scheduling"

const Sut = () => {
    class GetAllSchedulingStub implements GetAllScheduling{
        getAll(): Promise<Scheduling[]> {
            return new Promise((resolve)=>{
                resolve([
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
                    }
                ])
            })
        }
    }
    const getAllSchedulingStub = new GetAllSchedulingStub()
    const sut = new AllScheduling(getAllSchedulingStub)

    return {
        sut,
        getAllSchedulingStub
    }
}
describe('Test GetCustomer',()=>{
    test('should return 200 with schedules',async ()=>{
        const { sut } = Sut()

        const result = await sut.handle({})

        expect(result.statusCode).toBe(200)
        expect(result.data).toEqual(
        [
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
            }
        ])
    })
})