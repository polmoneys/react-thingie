import { type ReactNode, useRef } from 'react';

import type { Unit } from '../../interfaces';
import useScroll from '../../utilities/useScroll';
import { clsx } from '../../utils';

import styles from './index.module.css';

interface Props {
    children: ReactNode;
    height: Unit;
    sticky?: boolean;
}

export default function StickyHeader(props: Props) {
    const { sticky = false, children, height } = props;
    const ref = useRef<HTMLElement | null>(null);
    const forcedSticky = useScroll(window) >= 200;

    return (
        <nav
            ref={ref}
            className={clsx(
                styles.header,
                (sticky || forcedSticky) && styles.sticky,
            )}
            style={{ height }}
        >
            {children}
        </nav>
    );
}
