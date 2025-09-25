import { useRef } from 'react';

import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from 'react-aria';
import ReactDOM from 'react-dom';

import { clsx } from '../utils';

import type { DialogProps } from './interfaces';

import styles from './index.module.css';

export default function Dialog({
    onClose,
    children,
    isOpen,
    ...props
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

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            {...props}
            ref={ref}
            className={clsx(props.className, styles.dialog)}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            {...keyboardProps}
        >
            <FocusScope contain restoreFocus autoFocus>
                {children}
            </FocusScope>
        </div>,
        document.body,
    );
}
