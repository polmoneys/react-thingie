import { type RefObject, useEffect, useState } from 'react';

import ResizeObserver from 'resize-observer-polyfill';

interface Size {
    width: number | undefined;
    height: number | undefined;
}

export default function useResizeObserver<
    T extends HTMLElement = HTMLDivElement,
>(ref: RefObject<T | null>): Size {
    const [size, setSize] = useState<Size>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (ref.current == null) return;

        const resizeObserver = new ResizeObserver(
            (entries: ResizeObserverEntry[]) => {
                for (const entry of entries) {
                    setSize({
                        width: entry.contentRect.width,
                        height: entry.contentRect.height,
                    });
                }
            },
        );

        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);

    return size;
}
