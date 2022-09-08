export interface DateUtil {
    converterToIso(date: string): string
    differenceBetweenDates(start: Date,end: Date): number
}