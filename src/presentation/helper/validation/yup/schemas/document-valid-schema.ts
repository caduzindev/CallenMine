import { string } from "yup";

export const cpfOrCnpj = string().test(
    'document',
    '${path} cpf or cnpj invalid',
    (value,_) => {
        const document = value ? value : ''
        const pattern = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/

        if (pattern.test(document)) return true

        return false
    }
)