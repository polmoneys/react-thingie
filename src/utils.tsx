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

export const moveFocusTo = (selector: string) =>
    (document?.querySelector(selector) as HTMLElement)?.focus();

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
