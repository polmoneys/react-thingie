import { useEffect } from 'react';

export type RequireAtLeastOne<T> = {
    [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

type IntersectionOptions = RequireAtLeastOne<{
    ref?: React.RefObject<Element>;
    element?: Element;
}> & {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export default function useIntersectionObserver(
    opts: IntersectionOptions,
    callback: IntersectionObserverCallback,
) {
    const {
        ref,
        element,
        root = null,
        rootMargin = '0px',
        threshold = 0,
    } = opts;

    useEffect(() => {
        const target = element ?? ref?.current;
        if (!target) return;
        const observer = new IntersectionObserver(callback, {
            root,
            rootMargin,
            threshold,
        });
        observer.observe(target);
        return () => observer.disconnect();
    }, [callback, element, ref, root, rootMargin, threshold]);
}
