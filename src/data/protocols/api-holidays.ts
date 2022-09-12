export interface ApiHolidaysDtoReturn {
    name: string
    name_local: string
    language: string
    description: string
    country: string
    location: string
    type: string
    date: string
    date_year: string
    date_month: string
    date_day: string
    week_day: string
}
export interface ApiHolidays {
    getHoliday(date: string): Promise<ApiHolidaysDtoReturn[]>
}