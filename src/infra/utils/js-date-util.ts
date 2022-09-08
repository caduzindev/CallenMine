import { DateUtil } from "../../data/protocols/date-util";

export class JsDateUtil implements DateUtil {
    converterToIso(date: string): string {
        return new Date(date).toISOString()
    }

    differenceBetweenDates(start: Date, end: Date): number {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24

        const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

        return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }
}