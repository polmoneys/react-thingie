import { useRef } from 'react';

import type { RenderProp } from '../../interfaces';
import useResizeObserver from '../../utilities/useResizeObserver';
import { has } from '../../utils';

interface ContainerSizeProps {
    children: RenderProp<{ w: number; h: number }>;
}

export default function ContainerSize({ children }: ContainerSizeProps) {
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
