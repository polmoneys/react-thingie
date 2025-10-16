import {
    type UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import type {
    UseSlidingWindowOptions,
    UseSlidingWindowReturn,
} from './interfaces';

export default function useSlidingWindow<T>({
    items,
    itemHeight,
    maxRenderedItems = 42,
    scrollThreshold = 5,
}: UseSlidingWindowOptions<T>): UseSlidingWindowReturn<T> {
    const containerRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [isAddingItems, setIsAddingItems] = useState(false);
    const prevStartIndexRef = useRef(startIndex);

    // Track when window shifts (items being added/removed)
    useEffect(() => {
        if (startIndex !== prevStartIndexRef.current) {
            setIsAddingItems(true);
            prevStartIndexRef.current = startIndex;

            // Auto-reset the flag after a short delay
            const timer = setTimeout(() => setIsAddingItems(false), 100);
            return () => clearTimeout(timer);
        }
    }, [startIndex]);
    const endIndex = Math.min(startIndex + maxRenderedItems, items.length);

    const totalHeight = items.length * itemHeight;

    // Get visible items with their absolute positions
    const visibleItems = useMemo(() => {
        return items.slice(startIndex, endIndex).map((item, i) => ({
            item,
            index: startIndex + i,
            top: (startIndex + i) * itemHeight,
        }));
    }, [items, startIndex, endIndex, itemHeight]);

    const handleScroll = useCallback(
        (event: UIEvent<HTMLDivElement>) => {
            const scrollTop = event.currentTarget.scrollTop;
            const newStartIndex = Math.floor(scrollTop / itemHeight);

            // Check if we need to shift the window
            const distanceFromTop = newStartIndex - startIndex;
            const distanceFromBottom =
                startIndex + maxRenderedItems - newStartIndex;

            if (distanceFromTop >= scrollThreshold) {
                // Scrolling down - shift window down
                const shift = Math.min(
                    scrollThreshold,
                    items.length - (startIndex + maxRenderedItems),
                );
                if (shift > 0) {
                    setStartIndex((prev) =>
                        Math.min(prev + shift, items.length - maxRenderedItems),
                    );
                }
            } else if (
                distanceFromBottom >=
                maxRenderedItems - scrollThreshold
            ) {
                // Scrolling up - shift window up
                const shift = scrollThreshold;
                if (startIndex > 0) {
                    setStartIndex((prev) => Math.max(prev - shift, 0));
                }
            }
        },
        [
            itemHeight,
            startIndex,
            maxRenderedItems,
            scrollThreshold,
            items.length,
        ],
    );

    const scrollToIndex = useCallback(
        (index: number, behavior: ScrollBehavior = 'smooth') => {
            if (containerRef.current) {
                const targetScroll = index * itemHeight;
                containerRef.current.scrollTo({ top: targetScroll, behavior });
                // Update start index to center the target
                const newStart = Math.max(
                    0,
                    index - Math.floor(maxRenderedItems / 2),
                );
                setStartIndex(
                    Math.min(newStart, items.length - maxRenderedItems),
                );
            }
        },
        [itemHeight, maxRenderedItems, items.length],
    );

    return {
        visibleItems,
        containerProps: {
            ref: containerRef,
            style: {
                height: '600px',
                overflow: 'auto',
                position: 'relative',
            },
            onScroll: handleScroll,
        },
        innerProps: {
            style: {
                height: `${totalHeight}px`,
                position: 'relative',
            },
        },
        scrollToIndex,
        currentStartIndex: startIndex,
        currentEndIndex: endIndex,
        isAddingItems,
    };
}
