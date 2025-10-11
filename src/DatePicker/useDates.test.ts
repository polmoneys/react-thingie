import dayjs from 'dayjs';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { PeriodId } from './interfaces';
import {
    asDay,
    clampToDay,
    computeRangeForPeriod,
    iso,
    lastWorkingDayOfMonth,
} from './utils';

const dayFromDate = (d: Date) => clampToDay(dayjs(d));

const safeDateArb = fc.date({
    min: new Date(Date.UTC(1970, 0, 1)),
    max: new Date(Date.UTC(2100, 0, 1)),
});

describe('date utilities - basic behaviour', () => {
    it('asDay(string) matches dayjs(string) and iso(day) returns YYYY-MM-DD', () => {
        fc.assert(
            fc.property(safeDateArb, (d) => {
                const s = dayjs(d).format('YYYY-MM-DD');
                const a = asDay(s);
                expect(iso(a)).toBe(s);
            }),
        );
    });

    it('lastWorkingDayOfMonth returns a weekday within the same month and <= endOfMonth', () => {
        fc.assert(
            fc.property(safeDateArb, (d) => {
                const today = dayFromDate(d);
                const candidate = lastWorkingDayOfMonth(today);
                const lastDay = today.endOf('month');

                // weekday: Mon-Fri (day() in 1..5)
                expect(candidate.day()).toBeGreaterThanOrEqual(1);
                expect(candidate.day()).toBeLessThanOrEqual(5);

                // same month as lastDay
                expect(candidate.month()).toBe(lastDay.month());
                // not after the real last day -> replaced isSameOrBefore with !isAfter
                expect(!candidate.isAfter(lastDay, 'day')).toBe(true);
            }),
        );
    });
});

describe('computeRangeForPeriod and isPeriodEnabled', () => {
    const allPeriods: PeriodId[] = [
        'oneDay',
        'oneWeek',
        'oneMonths',
        'threeMonths',
        'sixMonths',
        'YTD',
        'oneYears',
        'threeYears',
        'fiveYears',
        'sevenYears',
        'tenYears',
        'inception',
        'custom',
    ];

    // Replace the 'computeRangeForPeriod returns start/end as clamped days and start <= end' test with this:

    it('computeRangeForPeriod returns start/end as clamped days and start <= end (except inception with oldest > today)', () => {
        fc.assert(
            fc.property(
                safeDateArb,
                fc.option(safeDateArb),
                fc.constantFrom(...allPeriods),
                (d, maybeOldestDate, period) => {
                    const today = dayFromDate(d); // use clampToDay(dayjs(d)) as before
                    const oldest = maybeOldestDate
                        ? dayFromDate(maybeOldestDate)
                        : null;
                    const { start, end } = computeRangeForPeriod(
                        period as PeriodId,
                        today,
                        oldest,
                    );

                    // outputs look like YYYY-MM-DD
                    expect(iso(start)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
                    expect(iso(end)).toMatch(/^\d{4}-\d{2}-\d{2}$/);

                    // end should always be clampToDay(today)
                    expect(iso(end)).toBe(iso(today));

                    // For all periods except 'inception' we require start <= end.
                    // For 'inception', if oldest exists and isAfter(today), start may be > end (that's allowed).
                    if (
                        period === 'inception' &&
                        oldest &&
                        oldest.isAfter(today, 'day')
                    ) {
                        // allowed: start may be after end
                        expect(iso(start)).toBe(iso(oldest)); // still verify it's using oldest
                    } else {
                        // otherwise start must be same-or-before end
                        expect(!start.isAfter(end, 'day')).toBe(true);
                    }
                },
            ),
        );
    });

    it('specific period arithmetic matches expectations', () => {
        fc.assert(
            fc.property(
                safeDateArb,
                fc.option(safeDateArb),
                (d, maybeOldest) => {
                    const today = dayFromDate(d);
                    const oldest = maybeOldest
                        ? dayFromDate(maybeOldest)
                        : null;

                    // oneDay
                    {
                        const { start, end } = computeRangeForPeriod(
                            'oneDay',
                            today,
                            oldest,
                        );
                        expect(iso(end)).toBe(iso(today));
                        expect(iso(start)).toBe(
                            iso(clampToDay(today.subtract(1, 'day'))),
                        );
                    }

                    // YTD
                    {
                        const { start } = computeRangeForPeriod(
                            'YTD',
                            today,
                            oldest,
                        );
                        expect(iso(start)).toBe(
                            iso(clampToDay(today.startOf('year'))),
                        );
                    }

                    // inception: uses oldest if provided
                    {
                        const res = computeRangeForPeriod(
                            'inception',
                            today,
                            oldest,
                        );
                        if (oldest) {
                            expect(iso(res.start)).toBe(iso(oldest));
                        } else {
                            expect(iso(res.start)).toBe(iso(today));
                        }
                    }

                    // custom returns start=end=today
                    {
                        const res = computeRangeForPeriod(
                            'custom',
                            today,
                            oldest,
                        );
                        expect(iso(res.start)).toBe(iso(today));
                        expect(iso(res.end)).toBe(iso(today));
                    }
                },
            ),
        );
    });
});
