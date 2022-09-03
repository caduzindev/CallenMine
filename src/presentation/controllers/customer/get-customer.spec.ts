import { Customer } from "../../../domain/entities/customer"
import { GetInfoCustomer } from "../../../domain/usecases/get-info-customer"
import { GetCustomer } from "./get-customer"

const Sut = ()=>{
    class GetInfoCustomerStub implements GetInfoCustomer {
        async get(document: string): Promise<Customer|boolean> {
            const faker_customer = {
                name: 'jose',
                document: '141.577.406-98'
            }

            return faker_customer
        }
    }
    const getInfoCustomerStub = new GetInfoCustomerStub()
    const sut = new GetCustomer(getInfoCustomerStub)

    return {
        sut,
        getInfoCustomerStub
    }
}

describe('Test GetCustomer',()=>{
    test('should returns 404 if customer not found',async ()=>{
        const { sut, getInfoCustomerStub } = Sut()
        const getCustomer = jest.spyOn(getInfoCustomerStub,'get')

        const httpRequest = {
            params: {
                document: '15648948'
            }
        }

        getCustomer.mockImplementationOnce(()=>new Promise((resolve)=>resolve(false)))

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 404,
            data: {}
        })
    })
})