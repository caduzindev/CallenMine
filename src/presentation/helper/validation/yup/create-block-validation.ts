import { object, string } from "yup";
import { Validation } from "../../../protocols/validation";
import { dateValidSchema } from "./schemas/date-valid-schema";

const createBlockSchema = object().shape({
    start: dateValidSchema,
    end: dateValidSchema,
    note: string().required()
})

export class CreateBlockValidation implements Validation {
    async validate(input: any): Promise<{ valid: boolean; message?: string | undefined; }> {
        return new Promise((resolve) => {
            createBlockSchema.validate(input,{ abortEarly: true })
                .then(()=>resolve({ valid: true }))
                .catch(err=>resolve({ valid: false, message: err.errors[0]}))
        })
    }
}