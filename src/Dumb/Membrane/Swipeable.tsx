import { useRef } from 'react';

import type { RenderProp } from '../../interfaces';
import useSwipe from '../../utilities/useSwipe';
import type { SwipeSummary } from '../../utilities/useSwipe/interfaces';
import { clsx, has } from '../../utils';

interface SwipeableProps {
    touchAction: 'pan-x' | 'pan-y';
    lock?: 'x' | 'y';
    threshold?: number;
    onEnd: (summary: SwipeSummary) => void;
    classNames?: {
        root?: string;
        isSwiping?: string;
    };
    children: RenderProp<{
        isSwiping: boolean;
    }>;
}

export default function Swipeable(props: SwipeableProps) {
    const {
        touchAction,
        lock: lockAxis,
        threshold = 16,
        onEnd,
        children,
        classNames,
    } = props;
    const ref = useRef<HTMLDivElement | null>(null);
    const { ref: swipeRef, isSwiping } = useSwipe(ref, {
        threshold,
        ...(has(lockAxis) && {
            lockAxis,
        }),
        onSwipe: (summary) => {
            onEnd(summary);
        },
    });

    return (
        <div
            ref={swipeRef}
            style={{ touchAction }}
            className={clsx(
                classNames?.root,
                isSwiping && classNames?.isSwiping,
            )}
        >
            {children({ isSwiping })}
        </div>
    );
}
