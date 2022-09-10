export interface Validation {
    validate(input: any): Promise<{ valid:boolean, message?: string }>
}