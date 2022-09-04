import { AddScheduling, AddSchedulingDto } from "../../../domain/usecases/add-scheduling"
import { CreateScheduling } from "./create-scheduling";

const Sut = ()=>{
    class AddSchedulingStub implements AddScheduling {
        async add(data: AddSchedulingDto): Promise<string> {
            return 'schedule_id';
        }
    }
    const addSchedulingStub = new AddSchedulingStub()
    const sut = new CreateScheduling(addSchedulingStub)

    return {
        sut,
        addSchedulingStub
    }
}

describe('Test Create Scheduling',()=>{
    test('should returns 400 if customer not informed',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
            body: {
                note: 'blabla',
                schedules: [{ date : 'Aug 30 2022', 'experts_id': [ 1, 2 ] }]
            }
        }

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 400,
            data: "customer is required"
        })
    })

    test('should returns 400 if note not informed',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
             body: {
                customer: 'carlos',
                schedules: [{ date : 'Aug 30 2022', 'experts_id': [ 1, 2 ] }]
            }
        }

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 400,
            data: "note is required"
        })
    })

    test('should returns 400 if schedules not informed',async ()=>{
        const { sut } = Sut()

        const httpRequest = {
             body: {
                customer: 'carlos',
                note: 'blabla'
            }
        }
        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 400,
            data: "schedules is required"
        })
    })

    test('should returns 200 if child was a success',async ()=>{
        const payload = {
            customer: "00.000.000/0000-00",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            schedules: [
                { date : "Aug 30 2022", experts_id: [ 1, 2 ] },
                { date : "Aug 31 2022", experts_id: [ 2 ] },
                { date : "Sep 1 2022", experts_id: [ 1 ] },
            ]
        }

        const httpRequest = {
            body: payload
        }

        const { sut, addSchedulingStub } = Sut()
        const add = jest.spyOn(addSchedulingStub,'add')

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 200,
            data: {
                schedule_id: 'schedule_id'
            }
        })
        expect(add).toBeCalledWith(payload)
    })
})