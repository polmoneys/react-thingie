import {
    type MouseEvent,
    type ReactNode,
    type TouchEvent,
    useRef,
    useState,
} from 'react';

import { type Series } from '../types';

import styles from '../index.module.css';

interface MouseProps {
    series: Series;
    children: (active: number | null) => ReactNode;
    windowSize?: number;
}

export default function Mouse(props: MouseProps) {
    const { series, children, windowSize } = props;
    const points =
        windowSize !== undefined
            ? series.map((item) => item.points.slice(0, windowSize))
            : series.map((item) => item.points);
    const [active, setActive] = useState<number | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const findClosestIndex = (clientX: number): number | null => {
        if (divRef.current == null) return null;

        const { left, width } = divRef.current.getBoundingClientRect();
        const xPercentage = (clientX - left) / width;
        const index = Math.round(xPercentage * (points[0].length - 1));

        return index;
    };

    const onMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
        setActive(findClosestIndex(event.clientX));
    };

    const onTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
        if (event.touches.length > 0) {
            setActive(findClosestIndex(event.touches[0].clientX));
        }
    };

    return (
        <div
            ref={divRef}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onTouchEnd={() => {
                setActive(null);
            }}
            onMouseLeave={() => {
                setActive(null);
            }}
            className={styles.tooltip}
        >
            {children(active)}
        </div>
    );
}
