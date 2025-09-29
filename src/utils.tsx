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

/*
interface Share {
  isin: string;
  name: string;
  // other properties...
}

const shares: Share[] = []
const uniqueShares = removeDuplicatesBy(shares, share => share.isin);

*/

export function removeDuplicatesBy<T, K>(
    input: T[],
    keySelector: (item: T) => K,
): T[] {
    const seen = new Set<K>();
    return input.filter((item) => {
        const key = keySelector(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

export function splitArray<T>(items: T[], fn: (el: T) => boolean): [T[], T[]] {
    const match = [] as T[];
    const dispose = [] as T[];
    for (const el of items) {
        if (fn(el)) {
            match.push(el);
        } else {
            dispose.push(el);
        }
    }
    return [match, dispose];
}

export function extractPowerWords(
    query: string,
    powerWords: string[],
    bannedWords: string[],
): [string[], string[]] {
    const processedQuery = query
        .toLowerCase()
        .replace(/[^\w\s'’-]/gi, '')
        .replace(/\s{2,}/g, ' '); // remove any extra whitespace

    if (processedQuery === '') return [[], []];

    const words = [...new Set(processedQuery.split(' '))];
    const powerWordsSet = new Set(powerWords.map((word) => word.toLowerCase()));
    const bannedWordsSet = new Set(
        bannedWords.map((word) => word.toLowerCase()),
    );

    const matches: string[] = [];
    const processedWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[,]/gi, ''); // remove punctuation marks

        const processedWord = word.toLowerCase();

        if (
            powerWordsSet.has(processedWord) &&
            !bannedWordsSet.has(processedWord)
        ) {
            matches.push(word);
        }
        if (
            !powerWordsSet.has(processedWord) &&
            !bannedWordsSet.has(processedWord)
        ) {
            processedWords.push(word);
        }
    }

    return [matches, processedWords];
}

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

interface DownloadOptions {
    filename?: string;
    content?: string | Blob;
    mimeType?: string;
    autoRevoke?: boolean;
}

export const onFileDownload = (options: DownloadOptions = {}): void => {
    const {
        filename = 'hello.txt',
        content = 'Hello, world!',
        mimeType = 'text/plain',
        autoRevoke = true,
    } = options;

    const blob: Blob =
        content instanceof Blob
            ? content
            : new Blob([content], { type: mimeType });

    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (autoRevoke) {
        URL.revokeObjectURL(link.href);
    }
};

export const getFormDataFromEvent = (
    event: React.FormEvent<HTMLFormElement>,
): { [k: string]: FormDataEntryValue } => {
    const formData = new FormData(event.target as HTMLFormElement);
    return Object.fromEntries(formData);
};

/*
const pluralizePost = pluralize('post')
console.log(pluralizePost(1)) // 'post'
console.log(pluralizePost(2)) // 'posts'
const pluralizeMouse = pluralize('mouse', 'mice')
*/

export const pluralize =
    (singular: string, plural = `${singular}s`) =>
    (quantity: number) =>
        Math.abs(quantity) === 1 ? singular : plural;
