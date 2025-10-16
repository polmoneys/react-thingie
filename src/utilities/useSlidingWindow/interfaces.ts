import type { CSSProperties, RefObject, UIEvent } from 'react';

export interface UseSlidingWindowOptions<T> {
    items: Array<T>;
    itemHeight: number;
    maxRenderedItems?: number;
    scrollThreshold?: number;
}

export interface UseSlidingWindowReturn<T> {
    // Rendered items with their absolute positions
    visibleItems: Array<{ item: T; index: number; top: number }>;

    // {...containerProps}
    containerProps: {
        ref: RefObject<HTMLDivElement | null>;
        style: CSSProperties;
        onScroll: (e: UIEvent<HTMLDivElement>) => void;
    };

    // {...innerProps}
    innerProps: {
        style: CSSProperties;
    };

    scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
    currentStartIndex: number;
    currentEndIndex: number;
    isAddingItems: boolean;
}
