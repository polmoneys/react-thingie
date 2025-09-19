import { useCallback } from 'react';

import type { Column } from './Table/interfaces';

export function has<T>(value: T | undefined): value is T {
    return value !== undefined;
}

export const callAll =
    <T extends unknown[]>(...fns: Array<((...args: T) => void) | undefined>) =>
    (...args: T) => {
        for (const fn of fns) fn?.(...args);
    };

export const clsx = (...params: unknown[]): string =>
    params.filter(Boolean).join(' ');

type ListFormatOptions = {
    type?: 'conjunction' | 'disjunction';
    style?: 'long' | 'short';
};

const defaultOptions: ListFormatOptions = {
    type: 'conjunction',
    style: 'long',
};
const defaultLocale = 'en';

export function formatSelectedKeys(
    selection: Set<React.Key>,
    options = defaultOptions,
    locale = defaultLocale,
) {
    return new Intl.ListFormat(locale, options).format(
        [...selection].map((item) => item.toString()),
    );
}

export interface Stock {
    code: string;
    id: string;
}

export type Person = { id: number; name: string; email?: string; age?: number };

export const TECH_STOCKS = [
    { code: 'AAPL', id: '0000' },
    { code: 'MSFT', id: '1111' },
    { code: 'GOOG', id: '2222' },
    { code: 'AMZN', id: '3333' },
    { code: 'TSLA', id: '4444' },
    { code: 'NVDA', id: '5555' },
    { code: 'META', id: '6666' },
];

export const COLUMNS: Column<Person>[] = [
    {
        label: 'Name',
        field: 'name',
        render: (v) => (
            <div style={{ width: '100%', backgroundColor: 'rgba(0,0,0,.1)' }}>
                <strong>{v as string}</strong>
            </div>
        ),
    },
    {
        label: 'Email',
        field: 'email',
        render: (v) => (
            <div style={{ width: '100%', backgroundColor: 'rgba(0,0,0,.3)' }}>
                <strong>{v as string}</strong>
            </div>
        ),
    },
    {
        label: 'Age',
        field: 'age',
        render: (v) => (
            <div style={{ width: '100%', backgroundColor: 'rgba(0,0,0,.5)' }}>
                <strong>{v as string}</strong>
            </div>
        ),
    },
];

export const USERS: Array<Person> = [
    { id: 1, name: 'A', email: 'a@x', age: 20 },
    { id: 2, name: 'B', email: 'b@x', age: 30 },
    { id: 3, name: 'Pol', email: 'b@x', age: 43 },
];

const customLog = console.log.bind(document);
export const OMG = (input: string) => customLog('======>', input, '<======');

/*

export const meterBackground = customGradient(
  [
    {
      color: 'navy',
      stop: '0%',
    },
    {
      color: 'navy',
      stop: '15%',
    },
    {
      color: 'red',
      stop: '15%',
    },
    {
      color: 'red',
      stop: '65%',
    },
    {
      color: 'green',
      stop: '65%',
    },
    {
      color: 'green',
      stop: '100%',
    },
  ],
  'x',
)

export const workweekBackground = repeatGradient(
  { start: 'transparent', end: 'var(--bg-idle)' },
  '20%',
  'x',
)

*/
export type Colors = Record<'start' | 'end', string>;
export type Percentage = `${string}%`;
export type Direction = 'x' | 'y';
export interface Stop {
    stop: Percentage;
    color: string;
}

export type Stops = Array<Stop>;

export const repeatGradient = (
    colors: Colors,
    size: Percentage,
    direction: Direction,
): string => `repeating-linear-gradient(
    ${direction === 'x' ? '90deg' : '0deg'},
    ${colors?.start ?? 'currentColor'},
    ${colors?.start ?? 'currentColor'} ${size},
    ${colors?.end ?? 'transparent'} ${size},
    ${colors?.end ?? 'transparent'} ${Number(size.replace('%', '')) * 2}%)`;

export const customGradient = (stops: Stops, direction: Direction): string =>
    `linear-gradient(${direction === 'x' ? '90deg' : '0deg'}, ${stops
        .reduce((acc, current) => acc + `${current.color} ${current.stop},`, '')
        .slice(0, -1)})`;

export const isHoverableDevice = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)');

export const moveFocusTo = (selector: string) =>
    (document?.querySelector(selector) as HTMLElement)?.focus();

type Id = string;

export function useReturnFocus(): (id: Id) => void {
    const moveFocus = useCallback((id: Id) => {
        return window.setTimeout(() => {
            const el = document.getElementById(id) as HTMLElement;
            el?.focus();
        }, 0);
    }, []);

    return moveFocus;
}

/*
  Usage:
  const value = 1234.567;
  const formattedValue = formatNumber(value, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });
  console.log(formattedValue); // "€1,234.57"
*/
export interface NumberFormatOptions {
    locale?: string | string[];
    style?: Intl.NumberFormatOptions['style'];
    currency?: Intl.NumberFormatOptions['currency'];
    currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay'];
    useGrouping?: Intl.NumberFormatOptions['useGrouping'];
    minimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits'];
    minimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];
    maximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];
    minimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits'];
    maximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits'];
}

export function formatNumber(
    value: number,
    options: NumberFormatOptions = {},
): string {
    const {
        locale = 'en-US',
        style = 'decimal',
        currency = 'USD',
        currencyDisplay = 'symbol',
        useGrouping = true,
        minimumIntegerDigits = 1,
        minimumFractionDigits = 0,
        maximumFractionDigits = 3,
        minimumSignificantDigits,
        maximumSignificantDigits,
    } = options;

    const numberFormat = new Intl.NumberFormat(locale, {
        style,
        currency,
        currencyDisplay,
        useGrouping,
        minimumIntegerDigits,
        minimumFractionDigits,
        maximumFractionDigits,
        minimumSignificantDigits,
        maximumSignificantDigits,
    });

    return numberFormat.format(value);
}

export const openUrl = (to: string): unknown => window?.open(to, '_blank');

/*
  const sideEffect = new Timer(
    () => setAlertMessage("hola :) you have been 4s on page"),
      4000
  );
 */

export class Timer {
    timerId: ReturnType<typeof setTimeout> | null = null;
    start?: number;
    remaining: number;
    cb: () => void;

    constructor(cb: () => void, delay: number) {
        this.remaining = delay;
        this.cb = cb;
        this.resume();
    }

    resume = (): void => {
        this.start = Date.now();
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(this.cb, this.remaining);
    };

    clear = (): void => {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
    };

    pause = (): void => {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }
        if (this.start !== undefined) {
            this.remaining -= Date.now() - this.start;
        }
    };
}
