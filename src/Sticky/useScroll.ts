import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useScroll(domNode: any): number {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const scroller = (): void => {
            setScrollY(domNode.scrollY ?? domNode.scrollTop);
        };

        domNode.addEventListener('scroll', scroller, { passive: true });

        return () => domNode.removeEventListener('scroll', scroller);
    }, [domNode]);

    return scrollY;
}
