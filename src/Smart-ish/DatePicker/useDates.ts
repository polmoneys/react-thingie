import { useEffect, useMemo, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import type { PeriodId } from './interfaces';
import {
    asDay,
    clampToDay,
    computeRangeForPeriod,
    iso,
    isPeriodEnabled,
    lastWorkingDayOfMonth,
} from './utils';

export type UseDatesOptions = {
    // YYYY-MM-DD
    inceptionDates: Array<string>;
    defaultPeriod?: PeriodId;
    defaultEndOfMonth?: boolean;
    // optional override for "now" (useful for tests) in YYYY-MM-DD
    today?: string;
    onInvalid?: () => void;
    onAfter?: () => void;
    onInvalidPeriod?: () => void;
};

export type UseDatesResult = {
    // YYYY-MM-DD
    oldestInceptionDate: string | null;
    // true = enabled
    availablePeriods: Record<PeriodId, boolean>;
    selectedPeriod: PeriodId;
    // YYYY-MM-DD
    startDate: string;
    // YYYY-MM-DD
    endDate: string;
    endOfMonth: boolean;
    showUI: boolean;
    setPeriod: (p: PeriodId) => void;
    setCustomRange: (start: string, end: string) => void;
    toggleEndOfMonth: (v?: boolean) => void;
};

export default function useDates(options: UseDatesOptions): UseDatesResult {
    const {
        inceptionDates,
        today: todayOverride,
        defaultPeriod = 'oneMonths',
        defaultEndOfMonth = false,
        onInvalid,
        onAfter,
        onInvalidPeriod,
    } = options;

    const today = useMemo(() => asDay(todayOverride), [todayOverride]);

    const inceptionKey = (inceptionDates || []).join('|');

    const oldestInceptionDay = useMemo(() => {
        if (!inceptionDates || inceptionDates.length === 0) return null;
        const sorted = inceptionDates
            .map((s) => dayjs(s))
            .filter((d) => d.isValid())
            .sort((a, b) => a.valueOf() - b.valueOf());
        return sorted.length ? clampToDay(sorted[0]) : null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inceptionKey]);

    const [selectedPeriod, setSelectedPeriod] =
        useState<PeriodId>(defaultPeriod);
    const [endOfMonth, setEndOfMonth] = useState<boolean>(defaultEndOfMonth);

    // start/end stored as Dayjs objects then exposed as ISO strings
    const [start, setStart] = useState<Dayjs>(
        () =>
            computeRangeForPeriod(defaultPeriod, today, oldestInceptionDay)
                .start,
    );
    const [end, setEnd] = useState<Dayjs>(
        () =>
            computeRangeForPeriod(defaultPeriod, today, oldestInceptionDay).end,
    );

    const availablePeriods = useMemo(() => {
        const all: PeriodId[] = [
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
        const map: Record<PeriodId, boolean> = all.reduce(
            (acc, p) => {
                acc[p] = isPeriodEnabled(p, today, oldestInceptionDay);
                return acc;
            },
            {} as Record<PeriodId, boolean>,
        );
        return map;
    }, [today, oldestInceptionDay]);

    useEffect(() => {
        if (selectedPeriod === 'custom') return; // custom handled by setCustomRange
        const { start: s, end: e } = computeRangeForPeriod(
            selectedPeriod,
            today,
            oldestInceptionDay,
        );
        setStart(s);
        setEnd(e);
    }, [selectedPeriod, today, oldestInceptionDay]);

    useEffect(() => {
        if (!endOfMonth) return;
        setStart((prev) => lastWorkingDayOfMonth(prev));
        setEnd((prev) => lastWorkingDayOfMonth(prev));
    }, [endOfMonth]);

    // If inceptionDates change, ensure selected period is still allowed
    useEffect(() => {
        if (!availablePeriods[selectedPeriod]) {
            // try to fall back to the newest allowed period (prefer shortest)
            const priority: PeriodId[] = [
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
            const found = priority.find((p) => availablePeriods[p]);
            setSelectedPeriod((found as PeriodId) ?? 'custom');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availablePeriods]);

    function setPeriod(p: PeriodId) {
        if (p !== 'custom' && !availablePeriods[p]) {
            onInvalidPeriod?.();
            // console.warn(
            //     `Period ${p} is not available for the current inception date`,
            // );
            return;
        }
        setSelectedPeriod(p);
        if (p === 'custom') return;
        const { start: s, end: e } = computeRangeForPeriod(
            p,
            today,
            oldestInceptionDay,
        );
        if (endOfMonth) {
            setStart(lastWorkingDayOfMonth(s));
            setEnd(lastWorkingDayOfMonth(e));
        } else {
            setStart(s);
            setEnd(e);
        }
    }

    function setCustomRange(startIso: string, endIso: string) {
        const s = clampToDay(dayjs(startIso));
        const e = clampToDay(dayjs(endIso));
        if (!s.isValid() || !e.isValid()) {
            onInvalid?.();
            // console.warn('Invalid custom date(s)');
            return;
        }
        if (s.isAfter(e)) {
            onAfter?.();
            // console.warn('Custom start is after end');
            return;
        }
        setSelectedPeriod('custom');
        if (endOfMonth) {
            setStart(lastWorkingDayOfMonth(s));
            setEnd(lastWorkingDayOfMonth(e));
        } else {
            setStart(s);
            setEnd(e);
        }
    }

    function toggleEndOfMonth(v?: boolean) {
        const next = typeof v === 'boolean' ? v : !endOfMonth;
        setEndOfMonth(next);
        if (next) {
            setStart((prev) => lastWorkingDayOfMonth(prev));
            setEnd((prev) => lastWorkingDayOfMonth(prev));
        }
    }

    return {
        oldestInceptionDate: oldestInceptionDay
            ? iso(oldestInceptionDay)
            : null,
        availablePeriods,
        selectedPeriod,
        startDate: iso(start),
        endDate: iso(end),
        endOfMonth,
        setPeriod,
        setCustomRange,
        toggleEndOfMonth,
        showUI: selectedPeriod === 'custom' && oldestInceptionDay !== null,
    } as UseDatesResult;
}
