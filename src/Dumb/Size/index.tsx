import { useRef } from 'react';

import type { RenderProp } from '../../interfaces';
import useResizeObserver from '../../utilities/useResizeObserver';
import { has } from '../../utils';

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
