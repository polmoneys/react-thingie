import {
    type CSSProperties,
    type PointerEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';

import { clsx } from '../../utils';

import type { MembraneProps, MoveData, Point } from './interfaces';
import { angleToDirection, computeSummaryFromData } from './utils';

import styles from './index.module.css';

export default function Membrane({
    width = 300,
    height = 220,
    threshold = 10,
    showOverlay: showLiveLine = true,
    fadeOutMs = 300,
    className,
    onStart,
    onMove,
    onEnd,
    children,
    label,
    circleFill = 'currentColor',
}: MembraneProps) {
    const elRef = useRef<HTMLDivElement | null>(null);
    const startRef = useRef<Point | null>(null);
    const lastRef = useRef<Point | null>(null);
    const rafRef = useRef<number | null>(null);
    const activeRef = useRef(false);

    const [destination, setDestination] = useState<Point | null>(null);
    const [overlay, setOverlay] = useState<{
        visible: boolean;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        fading: boolean;
    } | null>(null);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    function computeMoveData(start: Point, current: Point): MoveData {
        const dx = current.x - start.x;
        const dy = current.y - start.y;
        const distance = Math.hypot(dx, dy);
        // angle where 0 = right, 90 = up
        const angleRad = Math.atan2(-dy, dx);
        const angle = (angleRad * (180 / Math.PI) + 360) % 360;
        const diagonal = Math.hypot(width, height);
        const percent = Math.min(1, distance / diagonal);
        const direction = angleToDirection(angle);
        return {
            start,
            current,
            dx,
            dy,
            distance,
            angle,
            direction,
            percent,
        };
    }

    function flushRAFAndReport() {
        rafRef.current = null;
        const start = startRef.current;
        const last = lastRef.current;
        if (!start || !last) return;

        const data = computeMoveData(start, last);

        if (data.distance >= threshold) {
            if (onMove) {
                const summary = computeSummaryFromData(data);
                onMove(summary);
            }
        }

        if (showLiveLine) {
            setOverlay((_) => ({
                visible: true,
                x1: start.x,
                y1: start.y,
                x2: last.x,
                y2: last.y,
                fading: false,
            }));
        }
        setDestination(null);
    }

    function scheduleFlush() {
        if (rafRef.current == null) {
            rafRef.current = requestAnimationFrame(flushRAFAndReport);
        }
    }

    const onPointerDown: PointerEventHandler = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        const el = elRef.current;
        if (!el) return;
        el.setPointerCapture(event.pointerId);
        activeRef.current = true;
        const rect = el.getBoundingClientRect();
        const p = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        startRef.current = p;
        lastRef.current = p;

        if (onStart) onStart(p);

        if (showLiveLine) {
            setOverlay({
                visible: true,
                x1: p.x,
                y1: p.y,
                x2: p.x,
                y2: p.y,
                fading: false,
            });
        }

        event.preventDefault();
    };

    const onPointerMove: PointerEventHandler = (event) => {
        if (!activeRef.current) return;
        const el = elRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        lastRef.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        scheduleFlush();
    };

    const onPointerUp: PointerEventHandler = (e) => endPointer(e);
    const onPointerCancel: PointerEventHandler = () => endPointer();

    function endPointer(event?: PointerEvent | React.PointerEvent) {
        if (!activeRef.current) return;
        activeRef.current = false;
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        const start = startRef.current;
        const last = lastRef.current;
        if (!start || !last) return;
        const data = computeMoveData(start, last);

        if (data.distance >= threshold && onEnd) {
            const summary = computeSummaryFromData(data);
            onEnd({ summary, details: data });
        }

        setOverlay({
            visible: true,
            x1: start.x,
            y1: start.y,
            x2: last.x,
            y2: last.y,
            fading: false,
        });

        setDestination(last);

        window.setTimeout(() => {
            setOverlay((prev) => (prev ? { ...prev, fading: true } : prev));
            window.setTimeout(() => setOverlay(null), fadeOutMs);
        }, 10);

        // release pointer capture if possible
        try {
            const el = elRef.current;
            if (
                el &&
                'releasePointerCapture' in el &&
                (event as PointerEvent)?.pointerId != null
            ) {
                el.releasePointerCapture((event as PointerEvent).pointerId);
            }
        } catch (err) {
            // ignore
        }

        startRef.current = null;
        lastRef.current = null;
    }

    const containerStyle: CSSProperties = {
        width,
        height,
    };

    return (
        <div
            ref={elRef}
            className={clsx(styles.root, className)}
            style={containerStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            aria-label={label}
        >
            {children ? children : null}

            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                className={styles.overlay}
                preserveAspectRatio="none"
            >
                {destination ? (
                    <circle
                        cx={destination.x}
                        cy={destination.y}
                        r={18}
                        fill={circleFill}
                    />
                ) : null}
                {overlay ? (
                    <g
                        style={{
                            opacity: overlay.fading ? 0 : 1,
                            transition: `opacity ${fadeOutMs}ms ease-out`,
                        }}
                    >
                        <circle
                            cx={overlay.x1}
                            cy={overlay.y1}
                            r={6}
                            fill="currentColor"
                            opacity={0.15}
                        />
                        <line
                            x1={overlay.x1}
                            y1={overlay.y1}
                            x2={overlay.x2}
                            y2={overlay.y2}
                            stroke="currentColor"
                            strokeWidth={4}
                            strokeLinecap="round"
                        />
                    </g>
                ) : null}
            </svg>
        </div>
    );
}
