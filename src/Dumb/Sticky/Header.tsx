import { useRef } from 'react';

import type { RenderProp, Unit } from '../../interfaces';
import useScroll from '../../utilities/useScroll';
import { clsx } from '../../utils';

import styles from './index.module.css';

interface Props {
    children: RenderProp<{
        isSticky: boolean;
    }>;
    height: Unit;
    sticky?: boolean;
}

export default function StickyHeader(props: Props) {
    const { sticky = false, children, height } = props;
    const ref = useRef<HTMLElement | null>(null);
    const forcedSticky = useScroll(window) >= 200;
    const isSticky = sticky || forcedSticky;
    return (
        <nav
            ref={ref}
            className={clsx(styles.header, isSticky && styles.sticky)}
            style={{ height }}
        >
            {children({ isSticky })}
        </nav>
    );
}
