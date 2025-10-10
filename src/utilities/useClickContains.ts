import { type RefObject, useEffect } from 'react';

export default function useClickContains({
    ref,
    onInside,
    onOutside,
}: {
    ref: RefObject<HTMLElement | null>;
    onOutside?: () => void;
    onInside?: () => void;
}) {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const aside = ref.current;
            if (!aside?.contains(event.target as Node)) {
                onOutside?.();
            } else {
                onInside?.();
            }
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => {
            document.removeEventListener('click', onClick, {
                capture: true,
            });
        };
    });
}
