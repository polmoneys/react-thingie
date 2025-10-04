import { useCallback } from 'react';

import { parseAsNativeArrayOf, parseAsString, useQueryState } from 'nuqs';

type Demos = Array<string>;

export type UseDemosOptions = {
    key?: string;
};

export type UseDemosReturn = {
    demos: Demos;
    setDemos: (next: Demos | ((prev: Demos) => Demos)) => void;
    toggleDemo: (item: string) => void;
    clearDemos: () => void;
};

export default function useDemos(options?: UseDemosOptions): UseDemosReturn {
    const key = options?.key ?? 'demos';

    const [demos = [], setDemosRaw] = useQueryState<Demos>(
        key,
        parseAsNativeArrayOf(parseAsString),
    );

    const setDemos = useCallback(
        (next: Demos | ((prev: Demos) => Demos)) => {
            if (typeof next === 'function') {
                setDemosRaw((prev) => {
                    const prior = Array.isArray(prev) ? prev : [];
                    return (next as (p: Demos) => Demos)(prior);
                });
            } else {
                setDemosRaw(next);
            }
        },
        [setDemosRaw],
    );

    const toggleDemo = useCallback(
        (item: string) => {
            const haystack = new Set(demos);
            if (haystack.has(item)) {
                setDemos((prev) => prev.filter((x) => x !== item));
            } else {
                setDemos((prev) => [...prev, item]);
            }
        },
        [demos, setDemos],
    );

    const clearDemos = useCallback(() => setDemosRaw(null), [setDemosRaw]);

    return {
        demos,
        setDemos: setDemosRaw as (
            next: Demos | ((prev: Demos) => Demos),
        ) => void,
        toggleDemo,
        clearDemos,
    };
}
