import { object } from "yup";
import { Validation } from "../../../protocols/validation";
import { dateValidIsoSchema } from "./schemas/date-valid-schema";

const allExpertFreeSchema = object().shape({
    date: dateValidIsoSchema
})

export class AllExpertFreeValidation implements Validation {
    async validate(input: any): Promise<{ valid: boolean; message?: string | undefined; }> {
        return new Promise(resolve=> {
            allExpertFreeSchema.validate(input, { abortEarly: true })
                .then(()=>resolve({ valid: true }))
                .catch(err=>resolve({ valid: false, message: err.errors[0] }))
        })
    }
}