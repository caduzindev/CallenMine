import { array, number, object, string } from "yup";
import { Validation } from "../../../protocols/validation";
import { dateValidSchema } from "./schemas/date-valid-schema";

const createSchedulingSchema = object().shape({
    customer: string().required(),
    note: string().required(),
    schedules: array().required().min(1).of(object({
        date: dateValidSchema,
        experts_id: array().required().min(1).of(number())
    }))
})

export class CreateSchedulingValidation implements Validation {
    async validate(input: any): Promise<{ valid: boolean; message?: string | undefined; }> {
        return new Promise((resolve)=>{
            createSchedulingSchema.validate(input, { abortEarly: true } )
                .then(()=>resolve({ valid: true }))
                .catch(err=>resolve({ valid: false,message: err.errors[0]}))
        })
    }
}