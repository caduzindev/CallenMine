export interface DateUtil {
    converterToIso(date: string): string
    converterBrlToIso(date: string): string
    differenceBetweenDates(start: Date,end: Date): number
    addDaysToDate(date: string,days: number): string
    isBefore(date1: string,date2: string): boolean
    equals(date1: string,date2: string): boolean
    arrayRangeDates(start: string,end: string): string[]
}