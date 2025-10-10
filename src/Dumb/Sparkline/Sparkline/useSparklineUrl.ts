import { useCallback } from 'react';

import { parseAsString, useQueryState, useQueryStates } from 'nuqs';

import { type DataPoint } from './types';
import { formatDateTime, formatNumber } from './utils';

interface Return {
    isPointInUrl: (point: DataPoint) => boolean;
    pointForUrl: (point: DataPoint) => Record<'value' | 'date', string>;
    pointInUrlDetails: () => Record<'value' | 'date', string> | undefined;
    setSearchParams: (
        values:
            | Partial<Record<'value' | 'date', string>>
            | ((old: any) => Partial<Record<'value' | 'date', string>> | null),
    ) => Promise<URLSearchParams>;
}

export default function useSparklineUrl(): Return {
    const [valueInUrl] = useQueryState('value', parseAsString.withDefault(''));
    const [dateInUrl] = useQueryState('date', parseAsString.withDefault(''));

    // a setter that can change one or both query params at once
    const [, setSearchParams] = useQueryStates({
        value: parseAsString,
        date: parseAsString,
    });

    const hasValidPointInUrl = valueInUrl !== '' && dateInUrl !== '';

    const pointForUrl = (
        point: DataPoint,
    ): Record<'value' | 'date', string> => ({
        value: formatNumber(point.value, { maximumFractionDigits: 0 }),
        date: formatDateTime(new Date(point.date)).replaceAll('/', '-'),
    });

    const isPointInUrl = useCallback(
        (point: DataPoint): boolean => {
            const { date: dateAsUrl, value: valueAsUrl } = pointForUrl(point);
            return dateAsUrl === dateInUrl && valueAsUrl === valueInUrl;
        },
        [valueInUrl, dateInUrl],
    );

    const pointInUrlDetails = ():
        | Record<'value' | 'date', string>
        | undefined =>
        hasValidPointInUrl
            ? {
                  value: formatNumber(Number(valueInUrl)),
                  date: formatDateTime(new Date(dateInUrl)),
              }
            : undefined;

    return {
        isPointInUrl,
        pointForUrl,
        pointInUrlDetails,
        setSearchParams,
    };
}
