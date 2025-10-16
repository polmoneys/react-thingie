import { type RefObject, useEffect, useRef, useState } from 'react';

import type {
    MoveData,
    Point,
    SwipeSummary,
    UseSwipeOptions,
} from './interfaces';
import {
    computeMoveData,
    direction8To4ByDelta,
    INTERACTIVE_SELECTOR,
    mapPercentToDistanceHuman,
} from './utils';

// hint: Dumb/Membrane/Swipeable.tsx

export default function useSwipe<T extends Element = HTMLElement>(
    providedRef?: RefObject<T | null> | null,
    options: UseSwipeOptions = {},
) {
    const {
        threshold = 20,
        lockAxis = null,
        allowedDirections = null,
        preventDefaultOnSwipe = false,
        ignoreInteractive = true,
        size: optSize = null,
        onSwipe,
    } = options;

    // onSwipe stable via ref,no need to include as effect deps *
    const onSwipeRef = useRef<typeof onSwipe | null>(null);
    onSwipeRef.current = onSwipe ?? null;

    const internalRef = useRef<T | null>(null);
    const ref = (providedRef as RefObject<T>) ?? internalRef;

    const startRef = useRef<Point | null>(null);
    const lastRef = useRef<Point | null>(null);
    const rafRef = useRef<number | null>(null);
    const activeRef = useRef(false);
    const [isSwiping, setIsSwiping] = useState(false);

    function scheduleRaf(
        sizePx: number,
        onMoveFlush?: (data: MoveData) => void,
    ) {
        if (rafRef.current == null) {
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const start = startRef.current;
                const last = lastRef.current;
                if (!start || !last) return;
                const data = computeMoveData(start, last, sizePx, threshold);
                if (lockAxis === 'x' && Math.abs(data.dy) > Math.abs(data.dx))
                    return;
                if (lockAxis === 'y' && Math.abs(data.dx) > Math.abs(data.dy))
                    return;
                onMoveFlush?.(data);
            });
        }
    }

    useEffect(() => {
        const el = ref.current as unknown as Element | null;
        if (!el) return undefined;

        function onPointerDown(event: PointerEvent) {
            if (event.pointerType === 'mouse' && event.button !== 0) return;

            if (ignoreInteractive) {
                const target = event.target as Element | null;
                if (
                    target &&
                    target.closest &&
                    target.closest(INTERACTIVE_SELECTOR)
                )
                    return;
            }

            try {
                (el as Element).setPointerCapture?.(event.pointerId);
            } catch {
                //
            }

            activeRef.current = true;
            setIsSwiping(true);
            const rect = (el as Element).getBoundingClientRect();
            const p: Point = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            startRef.current = p;
            lastRef.current = p;
        }

        function onPointerMove(event: PointerEvent) {
            if (!activeRef.current) return;
            const rect = (el as Element).getBoundingClientRect();
            lastRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            const sizePx =
                optSize ?? Math.max(rect.width || 1, rect.height || 1);
            scheduleRaf(sizePx);
        }

        function onPointerUp(event: PointerEvent) {
            if (!activeRef.current) return;
            activeRef.current = false;
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            setIsSwiping(false);

            const rect = (el as Element).getBoundingClientRect();
            const start = startRef.current;
            const last = lastRef.current;
            if (!start || !last) return;

            const sizePx =
                optSize ?? Math.max(rect.width || 1, rect.height || 1);
            const data = computeMoveData(start, last, sizePx, threshold);

            if (lockAxis === 'x' && Math.abs(data.dy) > Math.abs(data.dx)) {
                startRef.current = null;
                lastRef.current = null;
                try {
                    (el as Element).releasePointerCapture?.(event.pointerId);
                } catch {
                    //
                }
                return;
            }
            if (lockAxis === 'y' && Math.abs(data.dx) > Math.abs(data.dy)) {
                startRef.current = null;
                lastRef.current = null;
                try {
                    (el as Element).releasePointerCapture?.(event.pointerId);
                } catch {
                    //
                }
                return;
            }

            if (data.distance >= threshold) {
                const direction4 = direction8To4ByDelta(data.dx, data.dy);
                const distanceHuman = mapPercentToDistanceHuman(data.percent);
                const summary: SwipeSummary = { direction4, distanceHuman };

                if (
                    !allowedDirections ||
                    allowedDirections.includes(data.direction8)
                ) {
                    const handler = onSwipeRef.current;
                    if (typeof handler === 'function') {
                        try {
                            handler(summary, data);
                        } catch (err) {
                            /* swallow user errors */
                        }
                    }

                    if (preventDefaultOnSwipe) {
                        try {
                            event.preventDefault();
                        } catch {
                            //
                        }
                    }
                }
            }

            try {
                (el as Element).releasePointerCapture?.(event.pointerId);
            } catch {
                //
            }
            startRef.current = null;
            lastRef.current = null;
        }

        function onPointerCancel() {
            activeRef.current = false;
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            setIsSwiping(false);
            startRef.current = null;
            lastRef.current = null;
        }

        el.addEventListener('pointerdown', onPointerDown as EventListener);
        el.addEventListener('pointermove', onPointerMove as EventListener);
        el.addEventListener('pointerup', onPointerUp as EventListener);
        el.addEventListener('pointercancel', onPointerCancel as EventListener);

        return () => {
            el.removeEventListener(
                'pointerdown',
                onPointerDown as EventListener,
            );
            el.removeEventListener(
                'pointermove',
                onPointerMove as EventListener,
            );
            el.removeEventListener('pointerup', onPointerUp as EventListener);
            el.removeEventListener(
                'pointercancel',
                onPointerCancel as EventListener,
            );
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
        // *
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        ref,
        threshold,
        lockAxis,
        allowedDirections,
        preventDefaultOnSwipe,
        ignoreInteractive,
        optSize,
    ]);

    return { ref: ref as RefObject<T>, isSwiping } as const;
}
