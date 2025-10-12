import { type ReactNode, useRef } from 'react';

import { useSwipe } from '../../utilities/useSwipe';
import type { SwipeSummary } from '../../utilities/useSwipe/interfaces';
import { clsx, has } from '../../utils';
// import type { RenderProp } from '../../interfaces';

/*

<Swipeable
    lock="x"
    touchAction="pan-x"
    classNames={{ root: 'theme', isSwiping: 'positive' }}
    onEnd={(d) => console.log({ d })}
>
    <Button>jaslñjasñjsal sl</Button>
</Swipeable>

*/

interface SwipeableProps {
    touchAction: 'pan-x' | 'pan-y';
    lock?: 'x' | 'y';
    threshold?: number;
    onEnd: (summary: SwipeSummary) => void;
    children: ReactNode;
    classNames?: {
        root?: string;
        isSwiping?: string;
    };
    // children?: RenderProp<{
    //     isSwiping: boolean;
    // }>;
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
            {children}
        </div>
    );
}
