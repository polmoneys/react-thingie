import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type KeyFn<T> = (item: T, index: number) => string | number;

export type UseSlidingWindow2Options<T> = {
    items: T[];
    itemHeight: number;
    pageSize?: number;
    maxRendered?: number;
    // items to shift the window by when crossing an edge
    step?: number;
    // initial scroll index (global index into items)
    initialIndex?: number;
    // optional key extractor for stable keys
    keyExtractor?: KeyFn<T>;
    // whether windowStart should snap to multiples of `step` (default true)
    alignToStep?: boolean;
    onWindowChange?: (windowStart: number, windowSize: number) => void; // hook user callback
};

export default function useSlidingWindow2<T>({
    items,
    itemHeight,
    pageSize = 100,
    maxRendered = 20,
    step = 3,
    initialIndex = 0,
    keyExtractor,
    alignToStep = true,
    onWindowChange,
}: UseSlidingWindow2Options<T>) {
    const effectivePageSize = Math.min(100, Math.max(1, Math.floor(pageSize)));

    const total = items.length;

    const clamp = useCallback(
        (v: number) => {
            const maxStart = Math.max(0, total - maxRendered);
            return Math.max(0, Math.min(maxStart, Math.floor(v)));
        },
        [total, maxRendered],
    );

    // If alignToStep, snap initial index to nearest lower multiple of step
    const initial = useMemo(() => {
        const raw = Math.max(0, Math.min(total - 1, Math.floor(initialIndex)));
        if (!alignToStep) return clamp(raw);
        return clamp(Math.floor(raw / step) * step);
    }, [initialIndex, alignToStep, step, clamp, total]);

    const [windowStart, setWindowStart] = useState<number>(initial);
    const windowSize = Math.min(maxRendered, Math.max(0, total - windowStart));

    // top / bottom spacer heights for full-scroll illusion
    const topSpacer = windowStart * itemHeight;
    const bottomSpacer = Math.max(
        0,
        (total - windowStart - windowSize) * itemHeight,
    );

    const containerRef = useRef<HTMLDivElement | null>(null);

    const pageIndexOf = useCallback(
        (globalIndex: number) => {
            return Math.floor(globalIndex / effectivePageSize);
        },
        [effectivePageSize],
    );

    const pageRangeForWindow = useMemo(() => {
        // pages touched by current window — useful for prefetch
        const firstPage = pageIndexOf(windowStart);
        const lastPage = pageIndexOf(windowStart + Math.max(0, windowSize - 1));
        const arr: number[] = [];
        for (let p = firstPage; p <= lastPage; p++) arr.push(p);
        return arr;
    }, [windowStart, windowSize, pageIndexOf]);

    const visibleItems = useMemo(() => {
        return items.slice(windowStart, windowStart + windowSize);
    }, [items, windowStart, windowSize]);

    const visibleKeys = useMemo(() => {
        if (!keyExtractor) return visibleItems.map((_, i) => i + windowStart);
        return visibleItems.map((it, i) => keyExtractor(it, i + windowStart));
    }, [visibleItems, keyExtractor, windowStart]);

    // scroll logic: compute firstVisible from scrollTop and shift window when near edges.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let raf = 0;

        function onScroll() {
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                if (el == null) return;
                const scrollTop = el?.scrollTop;

                const firstVisible = Math.floor(scrollTop / itemHeight);

                // If user is getting near the top edge of window, shift window up
                if (firstVisible < windowStart + step) {
                    const newStart = alignToStep
                        ? clamp(Math.floor((firstVisible - step) / step) * step)
                        : clamp(firstVisible - step);
                    if (newStart !== windowStart) setWindowStart(newStart);
                }
                // If user is near the bottom edge of window, shift window down
                else if (firstVisible > windowStart + windowSize - step - 1) {
                    const desired = firstVisible - (windowSize - step - 1);
                    const newStart = alignToStep
                        ? clamp(Math.floor(desired / step) * step)
                        : clamp(desired);
                    if (newStart !== windowStart) setWindowStart(newStart);
                }
            });
        }

        el.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            el.removeEventListener('scroll', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [
        containerRef,
        itemHeight,
        windowStart,
        windowSize,
        step,
        alignToStep,
        clamp,
    ]);

    const scrollToIndex = useCallback(
        (index: number, align: 'start' | 'center' | 'end' = 'start') => {
            const el = containerRef.current;
            if (!el) {
                // still update logical windowStart so visibleItems reflect change
                const clamped = clamp(index);
                setWindowStart(clamped);
                return;
            }
            const clamped = clamp(index);
            const y = clamped * itemHeight;
            if (align === 'center') {
                el.scrollTop = Math.max(
                    0,
                    y - el.clientHeight / 2 + itemHeight / 2,
                );
            } else if (align === 'end') {
                el.scrollTop = Math.max(0, y - el.clientHeight + itemHeight);
            } else {
                el.scrollTop = y;
            }
            setWindowStart(clamped);
        },
        [clamp, itemHeight],
    );

    const gotoPage = useCallback(
        (page: number, alignToPageStart = true) => {
            const p = Math.max(
                0,
                Math.min(
                    Math.floor((total - 1) / effectivePageSize),
                    Math.floor(page),
                ),
            );
            const idx = p * effectivePageSize;
            if (alignToPageStart) scrollToIndex(idx, 'start');
            else
                scrollToIndex(
                    Math.max(0, idx - Math.floor((maxRendered - 1) / 2)),
                    'center',
                );
        },
        [effectivePageSize, scrollToIndex, total, maxRendered],
    );

    // allow shifting window by steps programmatically
    const shiftWindow = useCallback(
        (delta: number) => {
            const target = clamp(windowStart + delta);
            setWindowStart(target);
            const el = containerRef.current;
            if (el) {
                el.scrollTop = target * itemHeight;
            }
        },
        [clamp, itemHeight, windowStart],
    );

    useEffect(() => {
        onWindowChange?.(windowStart, windowSize);
    }, [windowStart, windowSize, onWindowChange]);

    // Utility: return touched pages (useful for prefetch)
    const touchedPages = useMemo(
        () => pageRangeForWindow,
        [pageRangeForWindow],
    );

    return {
        containerRef,
        topSpacer,
        bottomSpacer,
        itemHeight,

        visibleItems,
        visibleKeys,
        windowStart,
        windowSize,

        effectivePageSize,
        pageOf: pageIndexOf,
        touchedPages,

        scrollToIndex,
        gotoPage,
        shiftWindow,
        setWindowStart,
        clamp,
    } as const;
}
