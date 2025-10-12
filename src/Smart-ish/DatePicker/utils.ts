import dayjs, { Dayjs } from 'dayjs';

import type { PeriodId } from './interfaces';

export const asDay = (d?: string) => (d ? dayjs(d) : dayjs());
export const iso = (d: Dayjs) => d.format('YYYY-MM-DD');

export function lastWorkingDayOfMonth(d: Dayjs) {
    // Get the last day of the month, then move backwards until it's a weekday (Mon-Fri).
    let candidate = d.endOf('month');
    while (candidate.day() === 0 || candidate.day() === 6) {
        candidate = candidate.subtract(1, 'day');
    }
    return candidate;
}

export function clampToDay(d: Dayjs) {
    return dayjs(d.format('YYYY-MM-DD'));
}

export function computeRangeForPeriod(
    period: PeriodId,
    today: Dayjs,
    oldest?: Dayjs | null,
) {
    switch (period) {
        case 'oneDay':
            return {
                start: clampToDay(today.subtract(1, 'day')),
                end: clampToDay(today),
            };
        case 'oneWeek':
            return {
                start: clampToDay(today.subtract(1, 'week')),
                end: clampToDay(today),
            };
        case 'oneMonths':
            return {
                start: clampToDay(today.subtract(1, 'month')),
                end: clampToDay(today),
            };
        case 'threeMonths':
            return {
                start: clampToDay(today.subtract(3, 'month')),
                end: clampToDay(today),
            };
        case 'sixMonths':
            return {
                start: clampToDay(today.subtract(6, 'month')),
                end: clampToDay(today),
            };
        case 'YTD':
            return {
                start: clampToDay(today.startOf('year')),
                end: clampToDay(today),
            };
        case 'oneYears':
            return {
                start: clampToDay(today.subtract(1, 'year')),
                end: clampToDay(today),
            };
        case 'threeYears':
            return {
                start: clampToDay(today.subtract(3, 'year')),
                end: clampToDay(today),
            };
        case 'fiveYears':
            return {
                start: clampToDay(today.subtract(5, 'year')),
                end: clampToDay(today),
            };
        case 'sevenYears':
            return {
                start: clampToDay(today.subtract(7, 'year')),
                end: clampToDay(today),
            };
        case 'tenYears':
            return {
                start: clampToDay(today.subtract(10, 'year')),
                end: clampToDay(today),
            };
        case 'inception':
            // If oldest is provided, use it. Otherwise default to today.
            return {
                start: oldest ?? clampToDay(today),
                end: clampToDay(today),
            };
        case 'custom':
            // custom handled outside
            return { start: clampToDay(today), end: clampToDay(today) };
        default:
            return { start: clampToDay(today), end: clampToDay(today) };
    }
}

// A period is enabled if the oldest inception date is on or before the periodStart
export function isPeriodEnabled(
    period: PeriodId,
    today: Dayjs,
    oldestInception: Dayjs | null,
) {
    if (period === 'custom') return true; // custom is always available
    if (period === 'inception') return Boolean(oldestInception);
    const { start } = computeRangeForPeriod(period, today, oldestInception);
    if (!oldestInception) return false;
    // enabled when our oldestInceptionDate is <= required start date
    return !oldestInception.isAfter(start, 'day');
}
