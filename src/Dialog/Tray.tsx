import { useEffect, useRef, useState } from 'react';

import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from 'react-aria';
import ReactDOM from 'react-dom';

import useViewportSize from '../utilities/useViewportSize';
import { clsx } from '../utils';

import type { DialogProps } from './interfaces';

import styles from './index.module.css';

export default function Tray({
    children,
    onClose,
    isOpen,
    ...rest
}: DialogProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                onClose();
            }
        },
    });

    const viewport = useViewportSize();
    const [height, setHeight] = useState(viewport.height); // vs. viewportHeight
    const timeoutRef = useRef<number | NodeJS.Timeout>(0);

    useEffect(() => {
        clearTimeout(timeoutRef.current);

        // When the height is decreasing, and the keyboard is visible
        // (visual viewport smaller than layout viewport), delay setting
        // the new max height until after the animation is complete
        // so that there isn't an empty space under the tray briefly.
        if (viewport.height < height && viewport.height < window.innerHeight) {
            timeoutRef.current = setTimeout(() => {
                setHeight(viewport.height);
            }, 500);
        } else {
            setHeight(viewport.height);
        }
    }, [height, viewport.height]);

    const trayHeight: Record<string, string> = {
        '--tray-min-height': `${height}px`,
    };

    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div
                {...keyboardProps}
                {...rest}
                ref={ref}
                className={clsx(styles.tray, styles.isOpen)}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                style={trayHeight}
            >
                <FocusScope contain restoreFocus autoFocus>
                    {children}
                </FocusScope>
            </div>
        </div>,
        document.body,
    );
}
