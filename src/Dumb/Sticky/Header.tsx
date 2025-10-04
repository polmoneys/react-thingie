import { type ReactNode, useRef } from 'react';

import useClickContains from '../../Drawer/useClickContains';
import useScroll from '../../utilities/useScroll';
import { clsx } from '../../utils';
import Font from '../Font';

import styles from './index.module.css';

interface Props {
    children: ReactNode;
    sticky?: boolean;
}

export default function StickyHeader(props: Props) {
    const { sticky = false, children } = props;
    const ref = useRef<HTMLElement | null>(null);
    const forcedSticky = useScroll(window) >= 200;

    useClickContains({
        ref,
        onInside: () => console.log('in'),
        onOutside: () => console.log('out'),
    });

    return (
        <nav
            ref={ref}
            className={clsx(
                styles.header,
                (sticky || forcedSticky) && styles.sticky,
            )}
            // {...(minimized && {
            //     onClick: onToggle,
            // })}
        >
            {!open && <Font className={styles.trigger}>✨</Font>}
            {children}
        </nav>
    );
}
