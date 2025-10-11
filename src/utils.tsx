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
