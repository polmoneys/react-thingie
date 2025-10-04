import { type ReactNode, useRef } from 'react';

import useResizeObserver from '../../utilities/useResizeObserver';
import { has } from '../../utils';

type RenderProp<T> = (props: T) => ReactNode;

interface Props {
    children: RenderProp<{ w: number; h: number }>;
}

export default function ContainerSize({ children }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { width: w, height: h } = useResizeObserver(containerRef);

    return (
        <div ref={containerRef}>
            {has(w) &&
                has(h) &&
                children({
                    w,
                    h,
                })}
        </div>
    );
}
