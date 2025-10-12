import { useRef } from 'react';

import type { RenderProp, Unit } from '../../interfaces';
import useScroll from '../../utilities/useScroll';
import { clsx, has } from '../../utils';

import styles from './index.module.css';

interface StickyHeaderProps {
    children: RenderProp<{
        isSticky: boolean;
    }>;
    height: Unit;
    sticky?: boolean;
    id?: string;
}

export default function StickyHeader(props: StickyHeaderProps) {
    const { sticky = false, children, height, id } = props;
    const ref = useRef<HTMLElement | null>(null);
    const forcedSticky = useScroll(window) >= 200;
    const isSticky = sticky || forcedSticky;
    return (
        <nav
            ref={ref}
            className={clsx(styles.header, isSticky && styles.sticky)}
            style={{ height }}
            {...(has(id) && { id })}
        >
            {children({ isSticky })}
        </nav>
    );
}
