import { DateUtil } from "../../data/protocols/date-util";

export class JsDateUtil implements DateUtil {
    converterToIso(date: string): string {
        return new Date(date).toISOString().split('T', 1)[0]
    }

    converterBrlToIso(date: string): string {
        return date.split('-').reverse().join('-')
    }

    converterIsoToBrl(date: string): string {
        return date.split('-').reverse().join('-')
    }

    differenceBetweenDates(start: Date, end: Date): number {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24

        const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

        return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }

    addDaysToDate(date: string, days: number): string {
        const start = new Date(date)
        const outputDate = new Date()
        outputDate.setDate(start.getDate() + days)

        return this.converterToIso(outputDate.toDateString())
    }

    isBefore(date1: string, date2: string): boolean {
        return new Date(this.converterToIso(date1)) < new Date(this.converterToIso(date2))
    }

    equals(date1: string, date2: string): boolean {
        return this.converterToIso(date1) == this.converterToIso(date2);
    }

    arrayRangeDates(start: string, end: string): string[] {
        const dateArray: string[] = [];
        let currentDate = new Date(this.converterToIso(start));

        while (currentDate <= new Date(this.converterToIso(end))) {
            dateArray.push(this.converterToIso(currentDate.toString()));
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        return dateArray;
    }
}