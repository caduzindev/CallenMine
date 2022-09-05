import { AddBlock, AddBlockDto } from "../../../domain/usecases/add-block";
import { CreateBlock } from "./create-block";

const Sut = ()=>{
    class AddBlockStub implements AddBlock {
       async add(data: AddBlockDto): Promise<string> {
        return 'block_id'
       }
    }
    const addBlockStub = new AddBlockStub()
    const sut = new CreateBlock(addBlockStub)

    return {
        sut,
        addBlockStub
    }
}

describe('Test CreateBlock', () => {
    test('should returns 200 if child was a success',async ()=>{
        const payload = {
            start: "Sep 7 2022",
            end: "Sep 7 2022",
            note: "Independece Day"
        }

        const httpRequest = {
            body: payload
        }

        const { sut, addBlockStub } = Sut()
        const add = jest.spyOn(addBlockStub,'add')

        const result = await sut.handle(httpRequest)

        expect(result).toEqual({
            statusCode: 200,
            data: {
                block_id: 'block_id'
            }
        })
        expect(add).toBeCalledWith(payload)
    })
});