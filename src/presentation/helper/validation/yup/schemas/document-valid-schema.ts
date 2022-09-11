import { string } from "yup";
import { cpf,cnpj } from 'cpf-cnpj-validator'

export const cpfOrCnpj = string().test(
    'document',
    '${path} cpf or cnpj invalid',
    (value,_) => {
        const document = value? value: ''

        if (cpf.isValid(document)) return true
        if (cnpj.isValid(document)) return true

        return false
    }
)