import { ApiHolidays, ApiHolidaysDtoReturn } from "../../data/protocols/api-holidays";
import axios from 'axios'
import { DateUtil } from "../../data/protocols/date-util";

export class AbstractHolidays implements ApiHolidays {
    constructor(private readonly dateUtil: DateUtil){}
    async getHoliday(date: string): Promise<ApiHolidaysDtoReturn[]> {
        const newDate = this.dateUtil.converterBrlToIso(date)
        const data = newDate.split('-')

        return new Promise((resolve,reject) => {
            axios.get(`https://holidays.abstractapi.com/v1/?api_key=${process.env.API_HOLIDAYS_KEY}&country=BR&year=${data[0]}&month=${data[1]}&day=${data[2]}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
        })
    }
}