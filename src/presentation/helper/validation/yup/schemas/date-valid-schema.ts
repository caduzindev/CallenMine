import { string } from "yup";

export const dateValidSchema = string().test(
    'date',
    '${path} is not valid',
    (value, _) => {
        const pattern = /\w{3} \d{1,2} \d{4}/i

        if (!value?.match(pattern)) return false

        const date = new Date(value);

        const timestamp = date.getTime();

        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }

        return true;
    }
)

export const dateValidIsoSchema = string().test(
    'date',
    '${path} is not valid',
    (value,_) => {
        const pattern = /\d{2}-\d{2}-\d{4}/i

        if (!value?.match(pattern)) return false

        const date = new Date(value);

        const timestamp = date.getTime();

        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }

        return true;
    }
)